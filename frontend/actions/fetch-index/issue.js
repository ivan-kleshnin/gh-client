import {map, maxBy, merge, reduceIndexed} from "ramda";
import Axios from "axios";
import {toObject} from "shared/helpers/common";
import Issue from "shared/models/issue";
import state from "frontend/state";
import alertActions from "frontend/actions/alert";

// CURSORS =========================================================================================
let modelCursor = state.select("issues");

// ACTIONS =========================================================================================
export default function fetchIndex(owner, repo) {
  console.debug("fetchIndex(...)");

  let url = `https://api.github.com/repos/${owner}/${repo}/issues`;

  modelCursor.set("loading", true);

  let headers = {};
  if (config["api-auth"]) {
    merge(headers, {
      "Authorization": config["api-auth"],
    });
  }

  return Axios.get(url, {headers: headers})
    .then(response => {
      let data = response.data;
      let newModels = map(m => Issue(m), data);

      modelCursor.select("models").merge(toObject(newModels, "number"));
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
        alertActions.addModel({message: "Action `Issue:fetchPage` failed: " + response.statusText, category: "error"});
        return response.status;
      }
    });
}


