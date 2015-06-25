//import Class from "classnames";
import {root} from "baobab-react/decorators";
import React from "react";
//import {Link} from "react-router";
import {RouteHandler} from "react-router";
import state from "frontend/state";
//import alertActions from "frontend/actions/alert";
import {Component} from "frontend/components/component";
//import AlertIndex from "frontend/components/index/alert";

// BODY ============================================================================================
@root(state)
export default class Body extends Component {
  render() {
    return (
      <div>
        <main id="main">
          <RouteHandler/>
        </main>
      </div>
    );
  }
}

//<AlertIndex/>
