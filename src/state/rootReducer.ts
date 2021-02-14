import { combineReducers } from 'redux';

import appReducer from './app/reducer';
import recipeReducer from './recipes/reducer';

const rootReducer = combineReducers({
  app: appReducer,
  recipes: recipeReducer
});

export default rootReducer;
