import { composeWithDevTools } from '@redux-devtools/extension';
import { legacy_createStore as createStore } from 'redux';
import rootReducer from './reducers';
// import thunk from 'redux-thunk';

const store = createStore(
  rootReducer,
  composeWithDevTools(),
);

if (window.Cypress) {
  window.store = store;
}

export default store;
