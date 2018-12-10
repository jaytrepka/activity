import React, { Component } from "react";
import { moveTeam, nextTeam, selectSpecialCard } from "../../actions/game";
import { Button } from "reactstrap";
import { connect } from "react-redux";
import Draw from '../Draw'

import "./style.css";

const PADDING = 30;

class Card extends Component {
  state = {
    remainingTime: this.props.game.timePerRound || 60,
    selected: false,
    started: false,
    guessed: false,
  };

  interval;
  drawingArea;

  componentDidMount() {
    this.getDrawingArea();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.specialCardTaken && !this.props.specialCardTaken) {
      this.getDrawingArea();
    }
  }

  getDrawingArea = () => {
    const element = document.getElementById("card-wrapper");
    const button = document.getElementById("button");
    const offsetHeight = button && button.offsetHeight ? button.offsetHeight : 50;
    this.drawingArea = {
      width: `${element.offsetWidth - PADDING}px`,
      height: `${element.offsetHeight - offsetHeight - PADDING - 10}px`,
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

  correct = (gameEnd = false) => {
    const { game: { activeCard, name, playingTeam, teams }, moveTeam } = this.props;
    const { guessed } = this.state;
    clearInterval(this.interval);
    if (!guessed) {
      moveTeam(name, teams[playingTeam].name, activeCard.value, false, gameEnd);
    }
    this.setState(() => ({ guessed: true }));
  }

  selectSpecialCard = (index) => {
    const { selectSpecialCard } = this.props;
    selectSpecialCard(index);
  }

  componentWillUnmount(){
    clearInterval(this.interval);
  }

  render() {
    const { game: { activeCard, drawing, specialCard, specialCardSelected }, nextTeam, special } = this.props;
    const { remainingTime, started } = this.state;
    const classNames = `card-icon field background-${activeCard.activity}-${activeCard.difficulty}`;
  
    if(special) {
      return (
        <div className="card-wrapper" id="card-wrapper">
          {specialCardSelected && <React.Fragment>
            {activeCard.activity === 1 && drawing && started && 
              <Draw width={this.drawingArea.width} height={this.drawingArea.height} />
            }
            {(activeCard.activity !== 1 || !drawing || !started) &&
              <React.Fragment>
                <div className={classNames}></div>
                <div className="card-text">{activeCard.text}</div>
                <div className="time-value-wrapper">
                  <div className="time">{remainingTime} s</div>
                </div>
              </React.Fragment>}
            {!started && <Button color="danger" size="lg" block onClick={() => this.startRound()} id="button">Start</Button>}
            {started &&
              <div className="card-buttons">
                <Button className="correct-button" color="success" size="lg" block onClick={() => this.correct(true)}>
                  {activeCard.activity === 1 && drawing ? `${remainingTime}s - Correct` : 'Correct'}
                </Button>
                <Button className="destroy-button" color="secondary" size="lg" block onClick={() => nextTeam()}>Destroy card</Button>
              </div>}
    
            {remainingTime < 1 && <audio ref="audio_tag" src="/sound.mp3" autoPlay />}
          </React.Fragment>}

          {!specialCardSelected && <React.Fragment>
            {specialCard.map((option, index) => {
              const iconClassNames = `card-icon-small field background-${index % 3}-${Math.floor(index / 3)}`;
              return (<div key={option} className="card-text special-card" onClick={() => this.selectSpecialCard(index)}>
                <span>{option}</span>
                <div className={iconClassNames}></div>
              </div>)})}
              <div>Other teams will choose</div>
          </React.Fragment>}
        </div>
      );
    }

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
        {started &&
          <div className="card-buttons">
            <Button className="correct-button" color="success" size="lg" block onClick={() => this.correct()}>
              {activeCard.activity === 1 && drawing ? `${remainingTime}s - Correct` : 'Correct'}
            </Button>
            <Button className="destroy-button" color="secondary" size="lg" block onClick={() => nextTeam()}>Destroy card</Button>
          </div>}

        {remainingTime < 1 && <audio ref="audio_tag" src="/sound.mp3" autoPlay />}
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
  { moveTeam, nextTeam, selectSpecialCard }
)(Card);
