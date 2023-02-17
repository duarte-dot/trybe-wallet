import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Wallet from './components/Wallet';
import './styles/styles.css';

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={ LoginPage } />
        <Route path="/carteira" component={ Wallet } />
      </div>
    );
  }
}

export default connect()(App);
