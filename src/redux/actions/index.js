// Coloque aqui suas actions

export const ADD_USER = 'ADD_USER';
export const ADD_WALLET = 'ADD_WALLET';

export const addUser = (user) => ({
  type: ADD_USER,
  payload: user,
});

export const addWallet = (wallet) => ({
  type: ADD_WALLET,
  payload: wallet,
});
