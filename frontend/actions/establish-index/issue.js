import state from "frontend/state";
import loadIndex from "frontend/actions/load-index/issue";

// CURSORS =========================================================================================
let urlCursor = state.select("url");
let modelCursor = state.select("issues");

// ACTIONS =========================================================================================
export default function establishIndex() {
  console.debug("establishIndex");

  let urlOwner = urlCursor.select("params").get("owner");
  let urlRepo = urlCursor.select("params").get("repo");

  modelCursor.set("owner", urlOwner);
  modelCursor.set("repo", urlRepo);

  loadIndex();
}
