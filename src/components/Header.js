import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import WalletForm from './WalletForm';

class Header extends Component {
  render() {
    const { expenses } = this.props;
    const { email } = this.props;
    const total = expenses.reduce((prev, curr, i) => {
      const actualValue = expenses.map((expense) => expense.value);
      const actualCurrency = expenses.map((expense) => expense.currency);
      return [...prev, curr.exchangeRates[actualCurrency[i]].ask * actualValue[i]];
    }, []).reduce((prev, curr) => prev + curr, 0);

    return (
      <header className="header">
        <div className="logo">
          <img className="img-logo" src="https://user-images.githubusercontent.com/78454964/221063269-f39b0a0f-9f3a-4524-b5e6-7aa24740f877.png" alt="logo" />
          <p className="title">
            Trybe
            {' '}
            <strong>Wallet</strong>
          </p>
        </div>
        <div className="user-info">
          <p data-testid="email-field">
            Email:
            {' '}
            {email}
          </p>
          <p
            data-testid="total-field"
          >
            { `Total de despesas: ${parseFloat(total).toFixed(2)} BRL` }
          </p>
        </div>
        <h3
          className="spend"
          data-testid="header-currency-field"
        >
          Gaste com sabedoria
        </h3>
        <WalletForm />
        <img className="boneco-1" src="https://user-images.githubusercontent.com/78454964/221045886-9f986478-044f-4394-b95b-249d703a74ae.png" alt="boneco-1" />
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.instanceOf(Array).isRequired,
};
