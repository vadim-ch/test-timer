import { IState } from '../index';
import { ISWState } from './index';

export const getSwState = (state: IState): ISWState => state.sw;

export const getWaitingRegistration = (state: IState) => {
  const registration = getSwState(state).registration;
  return registration ? registration.waiting : null;
};
