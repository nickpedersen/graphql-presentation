import React from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

class GraphQLDataFetcher extends React.Component {
  render() {
    const { data, render } = this.props;
    const { loading, teams } = data;
    // This is using the render-props method to pass data to it's children
    // See: https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce for an explaination
    return render(teams, loading);
  }
}

const query = gql`
  query {
    teams {
      id
      name
      players {
        id
        name
      }
    }
  }
`;

export default graphql(query)(GraphQLDataFetcher);
