import Axios from "axios";
import state from "frontend/state";
import fetchModel from "frontend/actions/fetch-model/issue";

// CURSORS
let modelCursor = state.select("issues");

// ACTIONS =========================================================================================
export default function loadModel() {
  console.debug("loadModel()");

  let number = modelCursor.get("number");
  let model = modelCursor.get("models", number);
  if (!model) {
    fetchModel(number);
  }
}
