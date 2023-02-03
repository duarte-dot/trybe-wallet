import React, { Component } from 'react';
import Header from './Header';
import Table from './Table';
import WalletForm from './WalletForm';

class Wallet extends Component {
  render() {
    return (
      <div>
        <Header />
        <WalletForm />
        <Table />
      </div>
    );
  }
}

export default Wallet;
