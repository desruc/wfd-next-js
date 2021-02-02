import { ClientState } from '~/state/rootReducer';

export const selectAppBootstrapComplete = (state: ClientState): boolean =>
  state.app.appBootstrapComplete;

export const selectColorMode = (state: ClientState): string =>
  state.app.colorMode;
