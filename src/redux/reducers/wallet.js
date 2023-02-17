// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
// Esse reducer será responsável por tratar as informações da pessoa usuária
import { ADD_CURRENCIES,
  ADD_EXPENSES,
  ADD_WALLET,
  DELETE_EXPENSE,
  EDIT_EXPENSE,
  EDIT_EXPENSE_REQUEST } from '../actions';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_WALLET:
    return {
      ...state,
      wallet: action.payload,
    };
  case ADD_CURRENCIES:
    return {
      ...state,
      currencies: action.payload,
    };
  case ADD_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.payload),
    };
  case EDIT_EXPENSE_REQUEST:
    return {
      ...state,
      editor: action.payload.edit,
      idToEdit: action.payload.id,
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.map(
        (expense) => (
          expense.id === action.payload.id ? action.payload : expense
        ),
      ),
    };
  default:
    return state;
  }
};

export default walletReducer;
