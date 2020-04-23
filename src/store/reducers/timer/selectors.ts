import { IState } from '../index';
import { ITimerState } from './index';

export const getTimerState = (state: IState): ITimerState => state.timer;

export const getCurrentInterval = (state: IState) => {
  return getTimerState(state).value;
};
