import React from "react";
import DocumentTitle from "react-document-title";
import {Component} from "frontend/components/component";

// EXPORTS =========================================================================================
export default class NotFound extends Component {
  render() {
    return (
      <DocumentTitle title="Not Found">
        <section className="container container-sm">
          <h1>Page not Found</h1>
          <p>Something is wrong</p>
        </section>
      </DocumentTitle>
    );
  }
}
