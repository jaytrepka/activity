import React, { Component } from 'react';
// import SectionList from './section-list'
import { connect } from 'react-redux'
import { newGame } from '../../actions/game'
import { Col, Row, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import CreateGame from '../CreateGame'
import Game from '../Game'
import Menu from '../Menu'
import './style.css'

const AVATARS = ['penguin', 'hippo', 'dogCute', 'dogUgly', 'monkey'];

class App extends Component {
  getContent = () => {
    const { general: { screen, isLoading, isError }, newGame } = this.props;

    if (isLoading) {
      return <div>Loader pico</div>;
    } else {
      switch(screen) {
        case 'create':
        case 'home':
        default: 
          return <CreateGame />;
        // case 'load': <LoadGame />;
        //   content = 
        //   return;
        case 'play':
          return <Game />;
        // case 'results':
        //   content = <Results />;
        //   return;
        // case 'home':
        // default: 
        //   content = <Home />;
        //   return;
      }
    }
  }
  render() {
    return (
      <div className="wrapper">
        <Menu />
        {/* <div>Created</div>
        <div onClick={() => newGame()}>New Game</div> */}
        
        <div className="screen">
          {this.getContent()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ general }) => {
  return {
    general
  }
}
export default connect(mapStateToProps, { newGame })(App)