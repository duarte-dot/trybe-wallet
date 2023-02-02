import React, { Component } from 'react';
import Header from './Header';
import WalletForm from './WalletForm';

class Wallet extends Component {
  render() {
    return (
      <div>
        <Header />
        <WalletForm />
      </div>
    );
  }
}

export default Wallet;
