import React, { Component } from "react";
import { loadGameScreen, toggleMenu } from "../../actions/general";
import { Button } from "reactstrap";
import { connect } from "react-redux";
import MenuIcon from "../../icons/Menu";
import { newGame, takeCard } from '../../actions/game'
import { plan } from "../Game/helpers";

import "./style.css";

class Menu extends Component {
  takeCard = () => {
    const { game, takeCard } = this.props;
    const card = plan[game.teams[game.playingTeam].position];
    takeCard(card.activity, card.difficulty);
  };
  render() {
    const {
      game,
      general: { cardTaken, menuOpened, screen },
      loadGameScreen,
      newGame,
      toggleMenu
    } = this.props;

    return (
      <div>
        <div className="menu">
          <div className="menu-inner">
            {screen === "play" &&
              !menuOpened &&
                (<div className="menu-action">
                  <span className="next-team">{game.teams[game.playingTeam].name}</span>
                  {!cardTaken && (<Button onClick={() => this.takeCard()}>Take card</Button>)}
                </div>
              )}
              {screen === "results" &&
                (<div className="menu-action">
                  <span className="next-team">{game.name}</span>
                </div>
              )}
              {screen !== "results" && screen !== "play" &&
                (<div className="menu-action">
                  <span className="next-team">ACTIVITY</span>
                </div>
              )}
            <div className="hamburger" onClick={() => toggleMenu()}>
              <MenuIcon width="35" height="35" />
            </div>
          </div>
        </div>
        <div className={`menu-drawer ${menuOpened ? "visible" : ""}`}>
          <div onClick={() => newGame()}>New Game</div>
          <div onClick={() => loadGameScreen()}>Load Game</div>
        </div>
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
export default connect(mapStateToProps, { loadGameScreen, newGame, takeCard, toggleMenu })(Menu);
