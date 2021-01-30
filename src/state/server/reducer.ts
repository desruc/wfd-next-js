import { AnyAction } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';

import { ClientState } from '../rootReducer';

const initialState: ClientState = {
  deployments: {
    deployments: []
  },
  instances: {
    instances: []
  }
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
