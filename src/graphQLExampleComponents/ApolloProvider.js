import React from "react";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";

import config from "../config";

const { graphQLURL } = config;

const client = new ApolloClient({
  link: new HttpLink({ uri: graphQLURL }),
  cache: new InMemoryCache()
});

export default class MyApolloProvider extends React.Component {
  render() {
    const { children } = this.props;
    return <ApolloProvider client={client}>{children}</ApolloProvider>;
  }
}
