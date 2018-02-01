import React from "react";
import config from "../config";

const { baseUrl } = config;

export default class RESTDataFetcher extends React.Component {
  state = {
    loading: true
  };

  componentDidMount() {
    // Fetch the teams
    const teamsUrl = `${baseUrl}/team`;
    fetch(teamsUrl)
      .then(result => result.json())
      .then(teams => {
        // Iterate over each team, and fetch the players
        const teamPlayerListPromises = teams.map(team => {
          const playerListUrl = `${baseUrl}/team/${team.id}/players`;
          return fetch(playerListUrl).then(result => result.json());
        });
        // Wait for each of the fetch promises to resolve
        Promise.all(teamPlayerListPromises).then(teamPlayerLists => {
          // Merge the player lists into the team objects
          const data = teams.map((team, index) => ({
            ...team,
            players: teamPlayerLists[index]
          }));
          // Update state with a fetched data, set loading to false
          this.setState({ data, loading: false });
        });
      });
  }

  render() {
    const { data, loading } = this.state;
    const { render } = this.props;
    // This is using the render-props method to pass data to it's children
    // See: https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce for an explaination
    return render(data, loading);
  }
}
