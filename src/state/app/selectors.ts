import { State } from 'wfd';

export const selectAppBootstrapComplete = (state: State): boolean =>
  state.app.appBootstrapComplete;

export const selectColorMode = (state: State): string => state.app.colorMode;
