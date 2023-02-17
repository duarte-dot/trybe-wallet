import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWith';

import INITIAL_STATE from './helpers/utils/globalState';
import Wallet from '../components/Wallet';

it('table - head', () => {
  const initialEntries = ['/carteira'];
  const { history } = renderWithRouterAndRedux(<Wallet />, { initialEntries });

  expect(history.location.pathname).toBe('/carteira');

  const descricao = screen.getByRole('columnheader', { name: /descrição/i });
  const tag = screen.getByRole('columnheader', { name: /tag/i });
  const method = screen.getByRole('columnheader', { name: /método de pagamento/i });
  const cambio = screen.getByRole('columnheader', { name: /câmbio utilizado/i });
  const converted = screen.getByRole('columnheader', { name: /valor convertido/i });
  const moeda = screen.getByRole('columnheader', { name: /moeda de conversão/i });
  const editdelete = screen.getByRole('columnheader', { name: /editar\/excluir/i });

  expect(descricao).toBeInTheDocument();
  expect(tag).toBeInTheDocument();
  expect(method).toBeInTheDocument();
  expect(cambio).toBeInTheDocument();
  expect(converted).toBeInTheDocument();
  expect(moeda).toBeInTheDocument();
  expect(editdelete).toBeInTheDocument();
});

it('table - body', async () => {
  const initialEntries = ['/carteira'];
  const { history } = renderWithRouterAndRedux(
    <Wallet />,
    { initialEntries, initialState: INITIAL_STATE },
  );

  expect(history.location.pathname).toBe('/carteira');

  const value = screen.getByRole('cell', { name: /30\.00/i });
  const description = screen.getByRole('cell', { name: /lanchão/i });
  const moeda = screen.getByRole('cell', { name: /euro\/real brasileiro/i });
  const method = screen.getByRole('cell', { name: /dinheiro/i });
  const tag = screen.getByRole('cell', { name: /alimentação/i });
  const cambio = screen.getByRole('cell', { name: /euro\/real brasileiro/i });
  const converted = screen.getByRole('cell', { name: /153.80/i });
  const edit = screen.getByRole('button', { name: /editar/i });
  const deletebutton = screen.getByRole('button', { name: /excluir/i });

  expect(value).toBeInTheDocument();
  expect(description).toBeInTheDocument();
  expect(moeda).toBeInTheDocument();
  expect(method).toBeInTheDocument();
  expect(tag).toBeInTheDocument();
  expect(cambio).toBeInTheDocument();
  expect(converted).toBeInTheDocument();
  expect(edit).toBeInTheDocument();
  expect(deletebutton).toBeInTheDocument();
});

it('edit expense', async () => {
  const initialEntries = ['/carteira'];
  const { history, store } = renderWithRouterAndRedux(
    <Wallet />,
    { initialEntries, initialState: INITIAL_STATE },
  );

  expect(history.location.pathname).toBe('/carteira');

  userEvent.type(screen.getByRole('textbox', { name: /valor:/i }), '30');
  userEvent.type(screen.getByTestId('description-input'), 'descricao2');
  userEvent.selectOptions(screen.getByTestId('method-input'), 'Dinheiro');
  userEvent.selectOptions(screen.getByTestId('tag-input'), 'Lazer');

  userEvent.click(screen.getByRole('button', { name: /adicionar despesa/i }));

  await waitFor(() => {
    const stateGlobal = store.getState();
    expect(stateGlobal.wallet.expenses[1].value).toBe('30');
    expect(stateGlobal.wallet.expenses[1].description).toBe('descricao2');
    expect(stateGlobal.wallet.expenses[1].currency).toBe('USD');
    expect(stateGlobal.wallet.expenses[1].method).toBe('Dinheiro');
    expect(stateGlobal.wallet.expenses[1].tag).toBe('Lazer');
    expect(stateGlobal.wallet.currencies).toEqual(INITIAL_STATE.wallet.currencies);
  });

  const btnEdit = screen.getAllByTestId('edit-btn');
  userEvent.click(btnEdit[0]);
  const editSaveBtn = screen.getByText('Editar despesa');
  expect(editSaveBtn).toBeInTheDocument();

  const inputValue = screen.getByRole('textbox', { name: /valor:/i });
  const inputDescription = screen.getByTestId('description-input');
  const currencySelector = screen.getByTestId('currency-input');
  const methodSelector = screen.getByTestId('method-input');
  const tagSelector = screen.getByTestId('tag-input');

  userEvent.type(inputValue, '23');
  userEvent.type(inputDescription, 'descricao');
  await waitFor(() => userEvent.selectOptions(currencySelector, 'USD'));
  userEvent.selectOptions(methodSelector, 'Cartão de crédito');
  userEvent.selectOptions(tagSelector, 'Lazer');

  await waitFor(() => {
    userEvent.click(editSaveBtn);

    const stateGlobal = store.getState();
    expect(stateGlobal.wallet.expenses[0].value).toBe('23');
    expect(stateGlobal.wallet.expenses[0].description).toBe('descricao');
    expect(stateGlobal.wallet.expenses[0].currency).toBe('USD');
    expect(stateGlobal.wallet.expenses[0].method).toBe('Cartão de crédito');
    expect(stateGlobal.wallet.expenses[0].tag).toBe('Lazer');
    expect(stateGlobal.wallet.currencies).toEqual(INITIAL_STATE.wallet.currencies);
  });
});

it('delete expense', () => {
  const { store } = renderWithRouterAndRedux(
    <Wallet />,
    { initialState: INITIAL_STATE },
  );

  const btnDelete = screen.getByTestId('delete-btn');
  expect(btnDelete).toBeInTheDocument();

  const displayValue = screen.getByRole('cell', { name: /30/i });
  expect(displayValue).toBeInTheDocument();

  userEvent.click(btnDelete);

  expect(displayValue).not.toBeInTheDocument();
  expect(store.getState().wallet.expenses.length).toBe(0);
});
