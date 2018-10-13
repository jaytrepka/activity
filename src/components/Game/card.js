import React, { Component } from "react";
import { connect } from "react-redux";
import { moveTeam, nextTeam } from "../../actions/game";
import {
  Button,
} from "reactstrap";

import "./style.css";

class Card extends Component {
  state = {
    remainingTime: this.props.game.timePerRound || 60,
    started: false,
    guessed: false,
  };

  interval;

  startRound = () => {
    this.setState(() =>({ started: true }))
    this.interval = setInterval(this.timer, 1000);
  }

  timer = () => {
    this.setState(prevState =>({ remainingTime: prevState.remainingTime - 1 }))
    if (this.state.remainingTime < 1) {
      clearInterval(this.interval);
    }
  }

  correct = () => {
    const { activeCard, game: { name, playingTeam, teams }, moveTeam } = this.props;
    clearInterval(this.interval);
    moveTeam(name, teams[playingTeam].name, activeCard.value)
  }

  componentWillUnmount(){
    clearInterval(this.interval);
  }

  render() {
    const { activeCard, nextTeam } = this.props;
    const { remainingTime, started } = this.state;
    const classNames = `card-icon field background-${activeCard.difficulty}-${activeCard.activity}`;
  
    return (
      <div className="card-wrapper">
        <div className={classNames}></div>
        <div className="card-text">{activeCard.text}</div>
        <div className="time-value-wrapper">
          <div className="card-value">{activeCard.value} points</div>
          <div className="time">{remainingTime} s</div>
        </div>
        {!started && <Button color="danger" size="lg" onClick={() => this.startRound()}>Start</Button>}
        {started && remainingTime > 0 && <Button color="success" size="lg" onClick={() => this.correct()}>Correct</Button>}
        {started && remainingTime < 1 && <Button color="secondary" size="lg" onClick={() => nextTeam()}>Destroy card</Button>}
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
  { moveTeam, nextTeam }
)(Card);
