import { CHANGE_INTERVAL } from '../../actions/change-interval';

export interface ITimerState {
  value: number;
}

export const initialIntervalState: ITimerState = {
  value: 0,
};

export const intervalReducer = (state, action) => {
  switch (action.type) {
    case CHANGE_INTERVAL:
      return {
        ...state,
        value: state.value + action.payload,
      };
    default:
      throw new Error();
  }
};
