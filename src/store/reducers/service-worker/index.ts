import { SW_UPDATE, SwUpdateAction } from '../../actions/sw-update';

export interface ISWState {
  registration: any;
}

export const initialState: ISWState = {
  registration: null,
};

export const sw = (
  state = initialState,
  action: SwUpdateAction
): ISWState => {
  switch (action.type) {
    case SW_UPDATE:
      return {
        ...state,
        registration: action.payload,
      };
    default:
      return state
  }
};
