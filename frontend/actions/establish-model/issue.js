import state from "frontend/state";
import loadModel from "frontend/actions/load-model/issue";

// CURSORS =========================================================================================
let urlCursor = state.select("url");
let modelCursor = state.select("issues");

// ACTIONS =========================================================================================
export default function establishModel() {
  console.debug("establishModel");

  let urlOwner = urlCursor.select("params").get("owner");
  let urlRepo = urlCursor.select("params").get("repo");
  let urlNumber = urlCursor.select("params").get("number");

  modelCursor.set("owner", urlOwner);
  modelCursor.set("repo", urlRepo);
  modelCursor.set("number", urlNumber);

  loadModel();
}
