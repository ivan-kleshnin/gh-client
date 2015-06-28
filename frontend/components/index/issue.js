import {map} from "ramda";
import Util from "util";
import React from "react";
import {Link} from "react-router";
import DocumentTitle from "react-document-title";
import {branch} from "baobab-react/decorators";
import {toArray} from "shared/helpers/common";
import {statics} from "frontend/helpers/react";
import state from "frontend/state";
import {router} from "frontend/router";
import modelActions from "frontend/actions/issue";
import {ShallowComponent, DeepComponent} from "frontend/components/component";
import {Error, Loading, NotFound} from "frontend/components/special";
import IssueItem from "frontend/components/item/issue";

// CURSORS =========================================================================================
let modelCursor = state.select("issues");

// COMPONENTS ======================================================================================
@statics({
  loadData: modelActions.establishIndex,
})
@branch({
  cursors: {
    issues: "issues",
  }
})
export default class IssueIndex extends DeepComponent {
  render() {
    let {owner, repo, models, loading, loadError} = this.props.issues;

    if (loadError) {
      return (
        <div>
          <Actions {...this.props}/>
          <Error loadError={loadError}/>
        </div>
      );
    } else {
      return (
        <DocumentTitle title={owner + "/" + repo}>
          <div>
            <Actions {...this.props}/>
            <section className="container container-sm">
              <h1>Issues</h1>
              <div>
                {map(model => <IssueItem owner={owner} repo={repo} model={model} key={model.number}/>, toArray(models))}
              </div>
            </section>
            {loading ? <Loading/> : ""}
          </div>
        </DocumentTitle>
      );
    }
  }
}

class Actions extends ShallowComponent {
  render() {
    let {owner, repo} = this.props.issues;

    let ownerComponent = <div className="form-group">
      <label htmlFor="owner">Owner&nbsp;</label>
      <input type="text" id="owner" ref="owner" className="form-control" defaultValue={owner}/>
    </div>;

    let repoComponent = <div className="form-group">
      <label htmlFor="repo">&nbsp;Repo&nbsp;</label>
      <input type="text" id="repo" ref="repo" className="form-control" defaultValue={repo}/>
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
      if (owner != modelCursor.get("owner") || repo != modelCursor.get("repo")) {
        router.transitionTo("issue-index", {owner, repo});
      } else {
        modelActions.establishIndex();
      }
    } else {
      router.transitionTo("issue-home");
    }
  }
}
