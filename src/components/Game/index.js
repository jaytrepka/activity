import React, { Component } from "react";

import { connect } from "react-redux";
import { createGame } from "../../actions/game";
import { computePlayerPosition, plan } from "./helpers";
import Card from "./card";
import isEqual from 'lodash/isEqual';
import Avatar from "../Avatar";

import "./style.css";

class Game extends Component {
  state = {
    positions: [],
    positionStyles: [],
  };

  componentDidMount() {
    const { game } = this.props;
    const positionStyles = game.teams.map(team => 
      computePlayerPosition(team.position)
    );
    const positions = game.teams.map(team => 
      team.position
    );
    this.setState(() => ({ positions, positionStyles }))
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.game.teams, nextProps.game.teams)) {
      this.changePosition(nextProps);
    }
  }

  changePosition = (nextProps) => {
    const { positions } = this.state;
    nextProps.game.teams.forEach((team, i) => {
      if (team.position !== positions[i]) {
        setTimeout(() => this.moveOneField(i, team.position - positions[i]), 200);
      }
    }
    );
  }

  moveOneField = (teamIndex, count) => {
    if (count === 0) return;
    const newPositionStyles = [...this.state.positionStyles];
    const newPositions = [...this.state.positions];
    const position = Math.min(this.state.positions[teamIndex] + 1, 50);
    newPositionStyles[teamIndex] = computePlayerPosition(position)
    newPositions[teamIndex] = position
    this.setState(() => ({ positions: newPositions, positionStyles: newPositionStyles })); 
    if (count === 1) return;   
    setTimeout(() => this.moveOneField(teamIndex, count - 1), 200);
  }

  render() {
    const { game, general } = this.props;
    const { positionStyles } = this.state;

    if (general.cardTaken) {
      return <Card />;
    }

    return (
      <div className="container">
        {[...Array(10).keys()].map(i => (
          <div className="row" key={i}>
            {[...Array(5).keys()].map(j => {
              const classNames = `field background-${plan[i * 5 + j].activity}-${
                plan[i * 5 + j].difficulty
              }`;
              return (
                <div className="col" key={i + j}>
                  <div className={classNames} />
                </div>
              );
            })}
          </div>
        ))}
        {game &&
          game.teams.map((team, i) => {
            return (
              <div
                className={`player ${team.avatar} ${i === game.playingTeam ? "active" : ""}`}
                key={i}
                style={positionStyles[i]}
              >
                <Avatar avatar={team.avatar} width="35" height="35" />
              </div>
            );
          })}
      </div>
    );
  }
}
const mapStateToProps = ({ game, general }) => {
  return {
    game,
    general
  };
};
export default connect(
  mapStateToProps,
  { createGame }
)(Game);
