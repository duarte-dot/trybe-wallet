import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import WalletForm from '../components/WalletForm';
import { renderWithRouterAndRedux } from './helpers/renderWith';

import INITIAL_STATE from './helpers/utils/globalState';

it('inputs', async () => {
  const { store } = renderWithRouterAndRedux(<WalletForm />);

  const inputValue = screen.getByRole('textbox', { name: /valor:/i });
  const inputDescription = screen.getByTestId('description-input');
  const currencySelector = screen.getByTestId('currency-input');
  const methodSelector = screen.getByTestId('method-input');
  const tagSelector = screen.getByTestId('tag-input');
  const buttonAdd = screen.getByRole('button', { name: /adicionar despesa/i });

  expect(buttonAdd).toBeInTheDocument();
  expect(buttonAdd).toHaveTextContent('Adicionar despesa');
  expect(buttonAdd).toHaveAttribute('type', 'submit');

  expect(inputDescription).toBeInTheDocument();
  expect(tagSelector).toBeInTheDocument();
  expect(methodSelector).toBeInTheDocument();
  expect(currencySelector).toBeInTheDocument();
  expect(inputValue).toBeInTheDocument();

  userEvent.type(inputValue, '30');
  userEvent.selectOptions(methodSelector, 'Dinheiro');
  userEvent.selectOptions(tagSelector, 'Alimentação');
  await waitFor(() => userEvent.selectOptions(currencySelector, 'EUR'));
  userEvent.type(inputDescription, 'lanchão');
  userEvent.click(buttonAdd);

  expect(inputValue).toHaveValue('30');
  expect(methodSelector).toHaveValue('Dinheiro');
  expect(tagSelector).toHaveValue('Alimentação');
  expect(currencySelector).toHaveValue('EUR');
  expect(inputDescription).toHaveValue('lanchão');
  expect(buttonAdd).toBeInTheDocument();
  expect(buttonAdd).toHaveTextContent('Adicionar despesa');

  expect(store.getState().wallet.currencies).toEqual(INITIAL_STATE.wallet.currencies);
});
