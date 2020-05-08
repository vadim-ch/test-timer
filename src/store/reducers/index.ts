import { combineReducers } from 'redux';
import { ISWState, sw } from './service-worker';
import { ITimerState, timer } from './timer';

export interface IState {
  timer: ITimerState;
  sw: ISWState;
}

const reducers = {
  timer,
  sw,
};

export const reducer = combineReducers<IState>({
  ...reducers,
});
