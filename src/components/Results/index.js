import React, { Component } from "react";
import Avatar from '../Avatar';
import { connect } from "react-redux";

import "./style.css";

class Results extends Component {

  render() {
    const { game } = this.props;

    return (
      <div className="container">
        {game &&
          game.teams.sort((a, b) => b.position - a.position).map((team, i) =>
            <div key={i} className="result-line">
              <div>{i + 1}. misto</div>
              <div className="avatar"><Avatar avatar={team.avatar} width="45" height="45" /></div>
              <div className="team-name">{team.name}</div>
            </div>
          )
        }
      </div>
    );
  }
}
const mapStateToProps = ({ game }) => {
  return {
    game
  };
};
export default connect(mapStateToProps)(Results);
