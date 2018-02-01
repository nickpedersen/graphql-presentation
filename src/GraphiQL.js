import GraphiQL from "graphiql";
import React from "react";

import config from "./config";

import "graphiql/graphiql.css";

const graphiqlFetcher = graphQLParams => {
  return fetch(config.graphQLURL, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(graphQLParams)
  }).then(response => response.json());
};

export default class GraphiQLComponent extends React.Component {
  render() {
    return (
      <div style={{ height: "60vh", textAlign: "left" }}>
        <GraphiQL fetcher={graphiqlFetcher} />
      </div>
    );
  }
}
