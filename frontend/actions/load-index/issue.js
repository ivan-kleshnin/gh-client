import Axios from "axios";
import state from "frontend/state";
import fetchIndex from "frontend/actions/fetch-index/issue";

// CURSORS =========================================================================================
let modelCursor = state.select("issues");

// ACTIONS =========================================================================================
export default function loadIndex() {
  console.debug("loadIndex()");

  let owner = modelCursor.get("owner");
  let repo = modelCursor.get("repo");
  let models = modelCursor.get("models");

  fetchIndex(owner, repo);
}
