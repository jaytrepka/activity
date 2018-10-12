import React, { Component } from "react";

import { connect } from "react-redux";
import { createGame } from "../../actions/game";
import { Col, Row, Container } from "reactstrap";
import { computePlayerPosition, plan } from "./helpers";
import Card from "./card";

import Capybara from "../../icons/Capybara";
import DogUgly from "../../icons/DogUgly";
import DogCute from "../../icons/DogCute";

import "./style.css";

class App extends Component {
  state = {
    teams: [
      {
        avatar: "penguin",
        name: "vul",
        position: 12
      },
      {
        avatar: "hippo",
        name: "kun",
        position: 2
      }
    ]
  };

  //   state = {
  //     gameName: '',
  //     numberOfTeams: 2,
  //     teams: [...Array(5).keys()].map(team => ({ name: `team${team + 1}`, avatar: AVATARS[team] })),
  //     timePerRound: 60,
  //   };
  render() {
    console.log("thisprop", this.props);
    const { activeCard, game, general } = this.props;

    if (general.cardTaken) {
      return <Card />;
    }

    return (
      <div className="container">
        {[...Array(10).keys()].map(i => (
          <div className="row">
            {[...Array(5).keys()].map(j => {
              const classNames = `col background-${plan[i * 5 + j].activity}-${
                plan[i * 5 + j].difficulty
              }`;
              return (
                <div className={classNames}>
                  <div className="field" />
                </div>
              );
            })}
          </div>
        ))}
        {game &&
          game.teams.map((team, i) => {
            return (
              <div
                className={`player ${i === game.playingTeam ? "active" : ""}`}
                key={i}
                style={computePlayerPosition(team.position)}
              >
                {i === 0 && <Capybara width="35" height="35" />}
                {i === 1 && <DogCute width="35" height="35" />}
                {i === 2 && <DogUgly width="35" height="35" />}
              </div>
            );
          })}
      </div>
    );
  }
}
const mapStateToProps = ({ cards: { activeCard }, game, general }) => {
  return {
    activeCard,
    game,
    general
  };
};
export default connect(
  mapStateToProps,
  { createGame }
)(App);
