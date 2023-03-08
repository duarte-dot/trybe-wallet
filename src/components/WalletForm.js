import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies,
  fetchExpenses,
  addExpenses,
  editExpenseRequest,
  editExpense } from '../redux/actions';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'BRL',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  editExpenseBtn = async () => {
    const { dispatch, idToEdit } = this.props;

    const exchangeRates = await fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((data) => data);
    delete exchangeRates.USDT;
    exchangeRates.BRL = { name: 'Real  Brasileiro', bid: '1', code: 'BRL', ask: '1' };

    const dispatching = () => {
      dispatch(editExpenseRequest({ editor: false, id: 0 }));
      dispatch(editExpense(this.state));
      this.setState({
        value: '',
        description: '',
        currency: 'BRL',
        method: 'Dinheiro',
        tag: 'Alimentação',
      });
    };

    this.setState({ id: idToEdit, exchangeRates }, dispatching);
  };

  fetchAPI = async () => {
    const { dispatch, expenses } = this.props;
    const id = expenses.length;
    const fetch = await fetchExpenses();
    const { value, description, currency, method, tag } = this.state;
    console.log(await fetch);
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
    const { currencies, editor } = this.props;
    const { value, description } = this.state;
    return (
      <div className="form-container">
        <form
          className="horizontal-form"
          onSubmit={ async (e) => {
            if (!editor) {
              e.preventDefault();
              await this.fetchAPI();
              this.setState({
                value: '',
                description: '',
              });
            } else {
              e.preventDefault();
              await this.editExpenseBtn();
            }
          } }
        >
          <div className="form-group">
            <label htmlFor="value">
              <p>Valor:</p>
              <input
                placeholder="Valor"
                id="value"
                value={ value }
                name="value"
                data-testid="value-input"
                onChange={ this.handleChange }
              />
            </label>
          </div>
          <div className="form-group">
            <select
              className="select-coin"
              data-testid="currency-input"
              name="currency"
              onChange={ this.handleChange }
            >
              <option
                value="BRL"
              >
                BRL
              </option>
              { currencies.map((currencie) => (
                <option
                  value={ currencie }
                  key={ currencie }
                >
                  {currencie}
                </option>
              )) }
            </select>
          </div>
          <div className="form-group">
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
          </div>
          <div className="form-group">
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
          </div>
          <div className="form-group">
            {' '}
            <input
              placeholder="Descrição"
              value={ description }
              id="description"
              name="description"
              data-testid="description-input"
              onChange={ this.handleChange }
            />
          </div>
          <button
            type="submit"
            className="button-add"
          >
            { editor ? 'Editar despesa' : 'Adicionar despesa' }
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
  editor: PropTypes.bool.isRequired,
  idToEdit: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
});

export default connect(mapStateToProps)(WalletForm);
