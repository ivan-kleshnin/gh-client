import {root} from "baobab-react/decorators";
import React from "react";
import {RouteHandler} from "react-router";
import state from "frontend/state";
import {Component} from "frontend/components/component";
import AlertIndex from "frontend/components/index/alert";

// BODY ============================================================================================
@root(state)
export default class Body extends Component {
  render() {
    return (
      <div>
        <main id="main">
          <RouteHandler/>
        </main>

        <AlertIndex/>
      </div>
    );
  }
}
