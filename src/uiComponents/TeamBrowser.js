import React from "react";

import "./styles.css";

export default class TeamBrowser extends React.Component {
  render() {
    const { teams } = this.props;
    return (
      <div className="Container">
        <div className="TeamsContainer">
          {teams.map(team => (
            <div className="TeamItem" key={team.id}>
              <div className="TeamHeader">{team.name}</div>
              <div className="TeamContent">
                {team.players.map(player => (
                  <div className="PlayerItem" key={player.id}>
                    <div className="PlayerName">{player.name}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
