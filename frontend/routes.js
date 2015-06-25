import React from "react";
import {Route, DefaultRoute, NotFoundRoute} from "react-router";
import Body from "frontend/components/body";
import {NotFound} from "frontend/components/special";
import IssueHome from "frontend/components/home/issue";
import IssueIndex from "frontend/components/index/issue";
import IssueDetail from "frontend/components/detail/issue";

// ROUTES ==========================================================================================
export default (
  <Route path="/" handler={Body}>
    <DefaultRoute name="issue-home" handler={IssueHome}/>
    <Route path="/:owner/:repo" name="issue-index" handler={IssueIndex}/>
    <Route path="/:owner/:repo/:number" name="issue-detail" handler={IssueDetail}/>
    <NotFoundRoute handler={NotFound}/>
  </Route>
);
