import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

test('Você deve criar um local para que a pessoa usuária insira seu e-mail e senha', async () => {
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

  const validEmail1 = 'gabrieldvr@outlook.com';
  const validEmail2 = 'gabriel.dvr@outlook.com';

  const { store, history } = renderWithRouterAndRedux(<App />, { initialState });

  const emailInput = screen.getByTestId('email-input');
  const passwordInput = screen.getByTestId('password-input');

  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();

  const button = screen.getByRole('button', { name: 'Entrar' });

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
