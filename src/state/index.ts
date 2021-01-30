import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { MakeStore, createWrapper } from 'next-redux-wrapper';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer, { State } from './rootReducer';

export const makeStore: MakeStore<State> = () =>
  createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...[logger, thunk]))
  );

export const wrapper = createWrapper<State>(makeStore, { debug: true });
