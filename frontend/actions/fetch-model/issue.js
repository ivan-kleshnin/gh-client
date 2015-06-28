import Axios from "axios";
import {toObject} from "shared/helpers/common";
import Issue from "shared/models/issue";
import state from "frontend/state";
import alertActions from "frontend/actions/alert";

// CURSORS =========================================================================================
let modelCursor = state.select("issues");

// ACTIONS =========================================================================================
export default function fetchModel(owner, repo, number) {
  console.debug(`fetchModel(${number})`);

  let url = `https://api.github.com/repos/${owner}/${repo}/issues/${number}`;

  modelCursor.set("loading", true);

  let headers = {
    "Authorization": config["api-auth"],
  };

  return Axios.get(url, {headers: headers})
    .then(response => {
      let data = response.data;
      let model = Issue(data);

      modelCursor.select("models").set(number, model);
      modelCursor.merge({
        loading: false,
        loadError: undefined
      });

      return response.status;
    })
    .catch(response => {
      if (response instanceof Error) {
        throw response;
      } else {
        modelCursor.merge({
          loading: false,
          loadError: {
            status: response.status,
            description: response.statusText,
            url: url
          }
        });

        // Add alert
        if (String(response.status).startsWith("4")) {
          // Special
          alertActions.addModel({message: `Failed to load ${owner}/${repo} page`, category: "warning", expire: 0});
        } else {
          // Generic
          alertActions.addModel({message: "Action `Issue:fetchModel` failed: " + response.statusText, category: "error"});
        }

        return response.status;
      }
    });
}
