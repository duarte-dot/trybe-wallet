import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

test('100% LoginPage', async () => {
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

  const { store, history } = renderWithRouterAndRedux(<App />, { initialState });

  const validEmail1 = 'gabrieldvr@outlook.com';
  const validEmail2 = 'gabriel.dvr@outlook.com';

  const emailInput = screen.getByTestId('email-input');
  const passwordInput = screen.getByTestId('password-input');
  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();

  const button = screen.getByRole('button', { name: 'Entrar' });
  expect(button).toBeInTheDocument();
  expect(button).toBeDisabled();

  userEvent.type(emailInput, 'gabrieldvr-outlook.com');
  userEvent.type(passwordInput, '123123');
  expect(button).toBeDisabled();

  userEvent.clear(emailInput);
  userEvent.clear(passwordInput);

  userEvent.type(emailInput, validEmail2);
  userEvent.type(passwordInput, '123123');
  expect(button).toBeEnabled();

  userEvent.clear(emailInput);
  userEvent.clear(passwordInput);

  userEvent.type(emailInput, validEmail1);
  userEvent.type(passwordInput, '123');
  expect(button).toBeDisabled();

  userEvent.clear(emailInput);
  userEvent.clear(passwordInput);

  userEvent.type(emailInput, validEmail1);
  userEvent.type(passwordInput, '123123');
  expect(button).toBeEnabled();

  userEvent.click(button);

  const state = store.getState();
  expect(state.user.email).toEqual('gabrieldvr@outlook.com');
  expect(history.location.pathname).toBe('/carteira');
  expect(screen.getByTestId('value-input')).toBeInTheDocument();
});
