import {map} from "ramda";
import Util from "util";
import React from "react";
import {Link} from "react-router";
import DocumentTitle from "react-document-title";
import {toArray} from "shared/helpers/common";
import {router} from "frontend/router";
import modelActions from "frontend/actions/issue";
import {ShallowComponent, DeepComponent} from "frontend/components/component";

import "frontend/components/index/index.less";

// COMPONENTS ======================================================================================
export default class IssueHome extends DeepComponent {
  render() {
    return (
      <DocumentTitle title="Home">
        <div>
          <Actions/>
        </div>
      </DocumentTitle>
    );
  }
}

class Actions extends ShallowComponent {
  render() {
    let owner = <div className="form-group">
      <label htmlFor="owner">Owner&nbsp;</label>
      <input type="text" id="owner" ref="owner" className="form-control"/>
    </div>;

    let repo = <div className="form-group">
      <label htmlFor="repo">&nbsp;Repo&nbsp;</label>
      <input type="text" id="repo" ref="repo" className="form-control"/>
    </div>;

    let load = <div className="form-group">
      &nbsp;<button type="button" className="btn btn-primary"
        onClick={() => this.load()}>
        Load
      </button>
    </div>;

    return (
      <div className="actions">
        <div className="container container-sm">
          <div className="form-inline">
            {owner}
            {repo}
            {load}
          </div>
        </div>
      </div>
    );
  }

  load() {
    let owner = React.findDOMNode(this.refs.owner).value;
    let repo = React.findDOMNode(this.refs.repo).value;
    if (owner && repo) {
      router.transitionTo("issue-index", {owner, repo});
    }

    // TODO error check
  }
}
