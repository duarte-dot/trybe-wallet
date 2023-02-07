import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

test('testa o componente header', () => {
  const initialState = {
    user: {
      email: '', // string que armazena o email da pessoa usuária
    },
    wallet: {
      currencies: [], // array de string
      expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
      editor: false, // valor booleano que indica de uma despesa está sendo editada
      idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
    },
  };

  renderWithRouterAndRedux(<App />, { initialState, initialEntries: ['/carteira'] });

  expect(screen.getByTestId('email-field')).toBeInTheDocument();
  expect(screen.getByTestId('total-field')).toHaveTextContent(0);
  expect(screen.getByTestId('header-currency-field')).toHaveTextContent('BRL');
});
