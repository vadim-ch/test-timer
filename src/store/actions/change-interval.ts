export const CHANGE_INTERVAL = 'CHANGE_INTERVAL';

export interface ChangeIntervalAction {
  type: typeof CHANGE_INTERVAL
  payload: number
}

export const changeInterval = (value: number): ChangeIntervalAction => {
  return {
    type: CHANGE_INTERVAL,
    payload: value,
  };
};
