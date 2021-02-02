import { AnyAction } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';

import { ClientState } from '../rootReducer';

import { initialState as appState } from '../app/reducer';
import { initialState as recipeState } from '../recipes/reducer';

const initialState: ClientState = {
  app: appState,
  recipes: recipeState
};

const reducer = (state = initialState, action: AnyAction): ClientState => {
  switch (action.type) {
    case HYDRATE:
      return {
        ...action.payload.client
      };

    default:
      return state;
  }
};

export default reducer;
