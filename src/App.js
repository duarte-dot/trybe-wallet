import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={ LoginPage } />
      </div>
    );
  }
}

export default connect()(App);
