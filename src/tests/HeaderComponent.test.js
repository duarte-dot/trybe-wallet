import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

test('100% Header', () => {
  const initialState = {
    user: {
      email: '',
    },
    wallet: {
      currencies: [],
      expenses: [],
      editor: false,
      idToEdit: 0,
    },
  };

  const { history } = renderWithRouterAndRedux(<App />, { initialState, initialEntries: ['/carteira'] });
  expect(history.location.pathname).toBe('/carteira');

  expect(screen.getByTestId('email-field')).toBeInTheDocument();
  expect(screen.getByTestId('total-field')).toHaveTextContent(0);
  expect(screen.getByTestId('header-currency-field')).toHaveTextContent('BRL');
});
