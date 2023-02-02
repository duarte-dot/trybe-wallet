import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrency } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrency());
  }

  render() {
    const { currencies } = this.props;
    return (
      <div>
        <form>
          <label htmlFor="value">
            Valor:
            <input
              id="value"
              name="value"
              data-testid="value-input"
            />
          </label>
          <select
            id="currency"
            name="currency"
            data-testid="currency-input"
          >
            {
              currencies.map((currency, index) => (
                <option key={ index } value={ currency.toLowerCase() }>{currency}</option>
              ))
            }
          </select>
          <select
            id="method"
            name="method"
            data-testid="method-input"
          >
            <option value="cash">Dinheiro</option>
            <option value="creditCard">Cartão de crédito</option>
            <option value="debitCard">Cartão de débito</option>
          </select>
          <select
            id="category"
            name="category"
            data-testid="tag-input"
          >
            <option value="food">Alimentação</option>
            <option value="recreation">Lazer</option>
            <option value="work">Trabalho</option>
            <option value="transport">Transporte</option>
            <option value="health">Saúde</option>
          </select>
          <label htmlFor="description">
            Descrição:
            {' '}
            <input
              id="description"
              name="description"
              data-testid="description-input"
            />
          </label>
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(String).isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);
