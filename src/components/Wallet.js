import React, { Component } from 'react';
import Header from './Header';
import Table from './Table';

class Wallet extends Component {
  render() {
    return (
      <div className="wallet">
        <Header />
        <Table />
      </div>
    );
  }
}

export default Wallet;
