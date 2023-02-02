// Esse reducer será responsável por tratar as informações da pessoa usuária

import { ADD_USER, ADD_WALLET } from '../actions';

const INITIAL_STATE = {
  email: '', // string que armazena o email da pessoa usuária
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_USER:
    return {
      ...state,
      email: action.payload,
    };
  case ADD_WALLET:
    return {
      ...state,
      wallet: action.payload,
    };
  default:
    return state;
  }
};

export default userReducer;
