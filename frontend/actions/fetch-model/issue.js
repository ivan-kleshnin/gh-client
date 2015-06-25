import Axios from "axios";
import {toObject} from "shared/helpers/common";
import Issue from "shared/models/issue";
import state from "frontend/state";
import alertActions from "frontend/actions/alert";

// CURSORS =========================================================================================
let modelCursor = state.select("issues");

// ACTIONS =========================================================================================
export default function fetchModel(number) {
  console.debug(`fetchModel(${number})`);

  let url = `https://api.github.com/repos/Paqmind/react-ultimate/issues/${number}`;

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
        loadError: false
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
        alertActions.addModel({message: "Action `Issue:fetchModel` failed: " + response.statusText, category: "error"});
        return response.status;
      }
    });
}
