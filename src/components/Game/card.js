import React, { Component } from "react";
import { connect } from "react-redux";
import { createGame } from "../../actions/game";

import "./style.css";

class Card extends Component {
  state = {};

  render() {
    console.log("thisprop", this.props);
    const { activeCard, game, general } = this.props;

    return (
      <div className="card">
        <div>{activeCard.text}</div>
        <div>{activeCard.value}</div>
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
)(Card);
