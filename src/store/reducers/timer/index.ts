import { CHANGE_INTERVAL, ChangeIntervalAction } from '../../actions/change-interval';

export interface ITimerState {
  value: number;
}

export const initialState: ITimerState = {
  value: 0,
};

export const timer = (
  state = initialState,
  action: ChangeIntervalAction
): ITimerState => {
  switch (action.type) {
    case CHANGE_INTERVAL:
      return {
        ...state,
        value: state.value += action.payload,
      };
    default:
      return state
  }
};
