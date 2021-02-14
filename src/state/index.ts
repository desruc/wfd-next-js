import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { MakeStore, createWrapper, HYDRATE } from 'next-redux-wrapper';
import { composeWithDevTools } from 'redux-devtools-extension';

import { State } from 'wfd';

import rootReducer from './rootReducer';

const consolidateServerStore = (state, action) => ({
  ...state,
  ...action.payload
});

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    return consolidateServerStore(state, action);
  }
  return rootReducer(state, action);
};

const makeStore: MakeStore<State> = () =>
  createStore(
    reducer,
    composeWithDevTools(applyMiddleware(...[logger, thunk]))
  );

export const wrapper = createWrapper<State>(makeStore, { debug: true });

export default wrapper;
