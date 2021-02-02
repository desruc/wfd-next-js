import { combineReducers } from 'redux';

import serverReducer from './server/reducer';
import appReducer, { AppSubState } from './app/reducer';
import recipeReducer, { RecipeSubState } from './recipes/reducer';

// https://github.com/kirill-konshin/next-redux-wrapper#state-reconciliation-during-hydration
// Each time when pages that have getStaticProps or getServerSideProps are opened by user the HYDRATE action will be dispatched.
// The payload of this action will contain the state at the moment of static generation or server side rendering, so your reducer must merge it with existing client state properly.
// The easiest and most stable way to make sure nothing is accidentally overwritten is to make sure that your reducer applies client side and server side actions to different substates of your state

// James' take
// Server substate holds a copy of current client state plus any actions dispatched on the server during page render (page has getStaticProps/getServerSideProps)
// Client substate holds resultant state of actions performed on client

export interface ClientState {
  app: AppSubState;
  recipes: RecipeSubState;
}

export interface State {
  server: ClientState;
  client: ClientState;
}

const clientReducer = combineReducers({
  app: appReducer,
  recipes: recipeReducer
});

const rootReducer = combineReducers({
  server: serverReducer,
  client: clientReducer
});

export default rootReducer;
