import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
      <div>
        <h1>Trybe Wallet</h1>
        <p data-testid="email-field">
          Email:
          {' '}
          {email}
        </p>
        <p
          data-testid="total-field"
        >
          { parseFloat(total).toFixed(2) }
        </p>
        <p
          data-testid="header-currency-field"
        >
          BRL
        </p>
      </div>
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
