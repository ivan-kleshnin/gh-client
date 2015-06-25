import Marked from "marked";
import React from "react";

// COMPONENTS ======================================================================================
export default class Markdown extends React.Component {
  static propTypes = {
    md: React.PropTypes.string.isRequired,
  }

  render() {
    let html = { __html:Marked(this.props.md) };
    return <div className="markdown-html" dangerouslySetInnerHTML={html} />;
  }
}
