import { AnyAction } from 'redux';
import { AppSubstate } from 'wfd';

import * as types from './types';

// If matchMedia does not exist - the browswer doesn't support dark mode
const prefersDarkMode = process.browser
  ? window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  : false;

export const initialAppSubstate: AppSubstate = {
  appBootstrapComplete: false,
  colorMode: prefersDarkMode ? 'dark' : 'light'
};

const appReducer = (
  state = initialAppSubstate,
  action: AnyAction
): AppSubstate => {
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
