import {map} from "ramda";
import Util from "util";
import Moment from "moment";
import React from "react";
import {Link} from "react-router";
import DocumentTitle from "react-document-title";
import {branch} from "baobab-react/decorators";
import {statics} from "frontend/helpers/react";
import state from "frontend/state";
import modelActions from "frontend/actions/issue";
import {ShallowComponent, DeepComponent} from "frontend/components/component";
import {Error, Loading, NotFound, Markdown} from "frontend/components/special";

// COMPONENTS ======================================================================================
@statics({
  loadData: modelActions.establishModel,
})
@branch({
  cursors: {
    issues: "issues",
  },
  facets: {
    model: "currentIssue",
  },
})
export default class IssueDetail extends DeepComponent {
  render() {
    let {owner, repo, loading, loadError} = this.props.issues;
    let model = this.props.model;

    if (loading) {
      return <Loading/>;
    } else if (loadError) {
      return (
        <div>
          <Actions {...this.props}/>
          <Error loadError={loadError}/>
        </div>
      );
    } else {
      return (
        <DocumentTitle title={owner + "/" + repo + "/" + model.number}>
          <div>
            <Actions {...this.props}/>
            <div className="container container-sm">
              <div className="margin-top">
                <div className="media">
                  <div className="media-body">
                    <h4 className="media-heading">
                      <Link to="issue-detail" params={{owner, repo, number: model.number}} title="Detail">
                        {model.title}
                      </Link>
                      &nbsp;
                      (<a href={model.html_url} title="View on GitHub" target="_blank">{model.number}</a>)
                    </h4>
                    <p>
                      <Markdown md={model.body}/>
                    </p>
                    <p>
                      {map(
                        m => <span key={m.name} className="label label-default" style={{background: "#" + m.color}}>{m.name}</span>,
                        model.labels
                      )}
                    </p>
                    <p>
                      Created: {Moment(model.created_at).format("YYYY-MM-DD hh:mm:ss")}
                    </p>
                  </div>
                  <div className="media-right">
                    <a href={model.user.html_url}><img width="50" src={model.user.avatar_url} title={model.user.login}/></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DocumentTitle>
      );
    }
  }
}

class Actions extends ShallowComponent {
  render() {
    let {owner, repo} = this.props.issues;

    return (
      <div className="actions">
        <div className="container container-sm">
          <div className="btn-group btn-group-sm pull-left">
            <Link to="issue-index" params={{owner, repo}} className="btn btn-gray-light" title="Back to list">
              <span className="fa fa-arrow-left"></span>
              <span className="hidden-xs margin-left-sm">Back to list</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
