// Coloque aqui suas actions

export const ADD_USER = 'ADD_USER';
export const ADD_CURRENCIES = 'ADD_CURRENCIES';
export const ADD_WALLET = 'ADD_WALLET';

export const addUser = (user) => ({
  type: ADD_USER,
  payload: user,
});

export const addCurrencies = (currencies) => ({
  type: ADD_CURRENCIES,
  payload: currencies,
});

export const addWallet = (wallet) => ({
  type: ADD_WALLET,
  payload: wallet,
});

export function fetchCurrency() {
  const currenciesCodes = [];
  return (dispatch) => fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((currencies) => Object.entries(currencies)
      .filter((currency) => currency[0] !== 'USDT')
      .forEach((currency) => {
        currenciesCodes.push(currency[0]);
        dispatch(addCurrencies(currenciesCodes));
      }));
}
