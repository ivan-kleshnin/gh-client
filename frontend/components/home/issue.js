import {map} from "ramda";
import Util from "util";
import React from "react";
import {Link} from "react-router";
import DocumentTitle from "react-document-title";
import {toArray} from "shared/helpers/common";
import {router} from "frontend/router";
import modelActions from "frontend/actions/issue";
import {ShallowComponent, DeepComponent} from "frontend/components/component";

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
    let ownerComponent = <div className="form-group">
      <label htmlFor="owner">Owner&nbsp;</label>
      <input type="text" id="owner" ref="owner" className="form-control"/>
    </div>;

    let repoComponent = <div className="form-group">
      <label htmlFor="repo">&nbsp;Repo&nbsp;</label>
      <input type="text" id="repo" ref="repo" className="form-control"/>
    </div>;

    let loadComponent = <div className="form-group">
      &nbsp;<button type="button" className="btn btn-primary"
        onClick={() => this.load()}>
        Load
      </button>
    </div>;

    return (
      <div className="actions">
        <div className="container container-sm">
          <div className="form-inline">
            {ownerComponent}
            {repoComponent}
            {loadComponent}
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
  }
}
