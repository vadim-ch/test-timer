import { combineReducers } from 'redux';
import { ITimerState, timer } from './timer';

export interface IState {
  timer: ITimerState;
}

const reducers = {
  timer,
};

export const reducer = combineReducers<IState>({
  ...reducers,
});
