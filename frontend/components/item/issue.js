import {map} from "ramda";
import Util from "util";
import Moment from "moment";
import React from "react";
import {Link} from "react-router";
import modelActions from "frontend/actions/issue";
import {ShallowComponent} from "frontend/components/component";
//import Markdown from "./markdown";

// COMPONENTS ======================================================================================
export default class IssueItem extends ShallowComponent {
  static propTypes = {
    owner: React.PropTypes.string.isRequired,
    repo: React.PropTypes.string.isRequired,
    model: React.PropTypes.object.isRequired,
  }

  render() {
    let {owner, repo, model} = this.props;

    return (
      <div className="media">
        <div className="media-body">
          <h4 className="media-heading">
            <Link to="issue-detail" params={{owner: owner, repo: repo, number: model.number}} title="Detail">
              {model.title}
            </Link>
            &nbsp;
            (<a href={model.html_url} title="View on GitHub" target="_blank">{model.number}</a>)
          </h4>
          <p>
            {map(
              m => <span key={m.name} className="label label-default padding-left" style={{background: "#" + m.color}}>{m.name}</span>,
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
    );
  }
}
