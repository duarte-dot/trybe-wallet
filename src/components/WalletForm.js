import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies, fetchExpenses, addExpenses } from '../redux/actions';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  fetchAPI = async () => {
    const { dispatch, expenses } = this.props;
    const id = expenses.length;
    const fetch = await fetchExpenses();
    const { value, description, currency, method, tag } = this.state;
    dispatch(addExpenses({
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: fetch }));
  };

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  };

  render() {
    const { currencies } = this.props;
    const { value, description } = this.state;
    return (
      <div>
        <form
          onSubmit={ async (e) => {
            e.preventDefault();
            await this.fetchAPI();
            this.setState({
              value: '',
              description: '',
            });
          } }
        >
          <label htmlFor="value">
            Valor:
            <input
              id="value"
              value={ value }
              name="value"
              data-testid="value-input"
              onChange={ this.handleChange }
            />
          </label>
          <select
            className="select-coin"
            data-testid="currency-input"
            name="currency"
            onChange={ this.handleChange }
          >
            { currencies.map((currencie) => (
              <option
                value={ currencie }
                key={ currencie }
              >
                {currencie}
              </option>
            )) }
          </select>
          <select
            id="method"
            name="method"
            data-testid="method-input"
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
          <select
            id="tag"
            name="tag"
            data-testid="tag-input"
            onChange={ this.handleChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
          <label htmlFor="description">
            Descrição:
            {' '}
            <input
              value={ description }
              id="description"
              name="description"
              data-testid="description-input"
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="submit"
          >
            Adicionar despesa
          </button>
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(String).isRequired,
  expenses: PropTypes.instanceOf(Array).isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(WalletForm);
