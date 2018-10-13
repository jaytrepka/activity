import React, { Component } from "react";
import { connect } from "react-redux";

import "./style.css";

class Results extends Component {

  render() {
    const { game } = this.props;

    return (
      <div className="container">
        {game &&
          game.teams.sort((a, b) => b.position - a.position).map((team, i) =>
            <div>{i + 1}. misto {team.name}</div>
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
