import React, { Component } from "react";
// import SectionList from './section-list'
import { connect } from "react-redux";
import { toggleMenu } from "../../actions/general";
import { takeCard } from "../../actions/cards";
import { Button } from "reactstrap";
import { plan } from "../Game/helpers";

import "./style.css";

class Menu extends Component {
  takeCard = () => {
    const { game, takeCard } = this.props;
    const card = plan[game.teams[game.playingTeam].position];
    takeCard(card.difficulty, card.activity);
  };
  render() {
    const {
      game,
      general: { cardTaken, menuOpened, screen },
      toggleMenu
    } = this.props;

    return (
      <div>
        <div className="menu">
          <div className="menu-inner">
            {screen === "play" &&
              !menuOpened &&
              !cardTaken && (
                <div>
                  Next team: {game.teams[game.playingTeam].name}
                  <Button onClick={() => this.takeCard()}>Take card</Button>
                </div>
              )}
            <div className="hamburger" onClick={() => toggleMenu()}>
              BUT
            </div>
          </div>
        </div>
        <div className={`menu-drawer ${menuOpened ? "visible" : ""}`}>
          VOLE SVINE
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
export default connect(
  mapStateToProps,
  { takeCard, toggleMenu }
)(Menu);
