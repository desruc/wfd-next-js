import { AnyAction } from 'redux';

import * as types from './types';

// If matchMedia does not exist - the browswer doesn't support dark mode
const prefersDarkMode = process.browser
  ? window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  : false;

export interface AppSubState {
  appBootstrapComplete: boolean;
  colorMode: string;
}

export const initialState: AppSubState = {
  appBootstrapComplete: false,
  colorMode: prefersDarkMode ? 'dark' : 'light'
};

const appReducer = (state = initialState, action: AnyAction): AppSubState => {
  switch (action.type) {
    case types.APP_BOOTSTRAP_COMPLETE_STATE:
      return {
        ...state,
        appBootstrapComplete: action.state
      };

    case types.CHANGE_COLOR_MODE:
      return {
        ...state,
        colorMode: action.colorMode
      };

    default:
      return state;
  }
};

export default appReducer;
