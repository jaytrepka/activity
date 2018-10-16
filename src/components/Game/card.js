import React, { Component } from "react";
import { moveTeam, nextTeam } from "../../actions/game";
import { Button } from "reactstrap";
import { connect } from "react-redux";
import Draw from '../Draw'

import "./style.css";

const PADDING = 30;

class Card extends Component {
  state = {
    remainingTime: this.props.game.timePerRound || 60,
    started: false,
    guessed: false,
  };

  interval;
  drawingArea;

  componentDidMount() {
    const element = document.getElementById("card-wrapper");
    const button = document.getElementById("button");
    this.drawingArea = {
      width: `${element.offsetWidth - PADDING}px`,
      height: `${element.offsetHeight - button.offsetHeight - PADDING - 10}px`,
    };
  }

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
    const { game: { activeCard, drawing }, nextTeam } = this.props;
    const { remainingTime, started } = this.state;
    const classNames = `card-icon field background-${activeCard.activity}-${activeCard.difficulty}`;
  
    return (
      <div className="card-wrapper" id="card-wrapper">
        {activeCard.activity === 1 && drawing && started && 
          <Draw width={this.drawingArea.width} height={this.drawingArea.height} />
        }
        {(activeCard.activity !== 1 || !drawing || !started) &&
          <React.Fragment>
          <div className={classNames}></div>
          <div className="card-text">{activeCard.text}</div>
          <div className="time-value-wrapper">
            <div className="card-value">{activeCard.value} points</div>
            <div className="time">{remainingTime} s</div>
          </div>
          </React.Fragment>}
        {!started && <Button color="danger" size="lg" block onClick={() => this.startRound()} id="button">Start</Button>}
        {started && remainingTime > 0 &&
          <Button color="success" size="lg" block onClick={() => this.correct()}>
            {activeCard.activity === 1 && drawing ? `${remainingTime}s - Correct` : 'Correct'}
          </Button>
        }
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
