import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { deleteExpense, editExpenseRequest } from '../redux/actions';

class Table extends Component {
  render() {
    const { expenses, dispatch } = this.props;
    return (
      <div className="div-table">
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {
              expenses.map((item) => (
                <tr key={ item.id }>
                  <td>{item.description}</td>
                  <td>{item.tag}</td>
                  <td>{item.method}</td>
                  <td>{parseFloat(item.value).toFixed(2)}</td>
                  <td>{item.exchangeRates[item.currency].name}</td>
                  <td>{parseFloat(item.exchangeRates[item.currency].ask).toFixed(2)}</td>
                  <td>
                    {
                      parseFloat(
                        item.value * item.exchangeRates[item.currency].ask,
                      ).toFixed(2).toString().replace('.', ',')
                    }
                  </td>
                  <td>REAL</td>
                  <td>
                    <button
                      data-testid="edit-btn"
                      onClick={ () => {
                        dispatch(editExpenseRequest({ edit: true, id: item.id }));
                      } }
                    >
                      <AiFillEdit className="edit-delete-buttons" />
                    </button>
                    <button
                      onClick={ () => dispatch(deleteExpense(item.id)) }
                      data-testid="delete-btn"
                    >
                      <AiFillDelete className="edit-delete-buttons" />
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.instanceOf(Array).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Table);
