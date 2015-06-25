// Scripts
import "babel/polyfill";
import {filter, keys, map, pipe} from "ramda";
import React from "react";
import {create as createRouter, HistoryLocation} from "react-router";
import "shared/shims"; // TODO except for prerender (isomorphic) step, because babel-node auto-injects it's polyfill
import {normalize, flattenArrayObject} from "shared/helpers/common";
import {joiValidate} from "shared/helpers/validation";
import commonValidators from "shared/validators/common";
import state from "frontend/state";
import routes from "frontend/routes";

// Styles
import "frontend/common/theme.less";

// APP =============================================================================================
window._router = createRouter({
  routes: routes,
  location: HistoryLocation
});

window._router.run((Application, url) => {
  console.debug("router.run()");

  // SET BAOBAB URL DATA ---------------------------------------------------------------------------
  let urlCursor = state.select("url");
  let handler = url.routes.slice(-1)[0].name;
  let params = normalize(url.params);
  let query = normalize(url.query);

  // Update URL primary state
  urlCursor.set("handler", handler);
  urlCursor.set("route", url.routes.slice(-1)[0].name);
  urlCursor.set("params", params);
  urlCursor.set("query", query);

  let id = url.params.id;
  urlCursor.set("id", id);

  //------------------------------------------------------------------------------------------------

  let promises = pipe(
    filter(route => route.handler.loadData),
    map(route => route.handler.loadData())
  )(url.routes);

  Promise.all(promises).then(() => {
    React.render(<Application/>, document.getElementById("app"));
  });
});
