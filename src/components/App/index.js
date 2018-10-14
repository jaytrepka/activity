import React, { Component } from 'react';
import { connect } from 'react-redux';
import CreateGame from '../CreateGame';
import Error from '../Error';
import Game from '../Game';
import LoadGame from '../LoadGame';
import Loader from '../Loader';
import Menu from '../Menu';
import Results from '../Results';

import './style.css';


class App extends Component {
  getContent = () => {
    const { general: { screen, isLoading } } = this.props;
    console.log('vole', this.props);
    

    if (isLoading || screen === 'init') {
      return <Loader />;
    } else {
      switch(screen) {
        case 'create':
        case 'home':
        default: 
          return <CreateGame />;
        case 'load': 
          return <LoadGame />;
        case 'play':
          return <Game />;
        case 'results':
          return <Results />;
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
        <div className="screen">
          {this.getContent()}
        </div>
        <Error />
      </div>
    );
  }
}

const mapStateToProps = ({ general }) => {
  return {
    general
  }
}
export default connect(mapStateToProps)(App)