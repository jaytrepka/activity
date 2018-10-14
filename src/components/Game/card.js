import React, { Component } from "react";
import { moveTeam, nextTeam } from "../../actions/game";
import { Button } from "reactstrap";
import { connect } from "react-redux";

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
    const { game: { activeCard, name, playingTeam, teams }, moveTeam } = this.props;
    const { guessed } = this.state;
    clearInterval(this.interval);
    
    if (!guessed) {
      moveTeam(name, teams[playingTeam].name, activeCard.value);
    }
    this.setState(() => ({ guessed: true }));
  }

  componentWillUnmount(){
    clearInterval(this.interval);
  }

  render() {
    const { game: { activeCard }, nextTeam } = this.props;
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
        {!started && <Button color="danger" size="lg" block onClick={() => this.startRound()}>Start</Button>}
        {started && remainingTime > 0 && <Button color="success" size="lg" block onClick={() => this.correct()}>Correct</Button>}
        {started && remainingTime < 1 && <Button color="secondary" size="lg" block onClick={() => nextTeam()}>Destroy card</Button>}
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
  { moveTeam, nextTeam }
)(Card);
