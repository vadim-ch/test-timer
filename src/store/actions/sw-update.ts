export const SW_UPDATE = 'SW_UPDATE';

export interface SwUpdateAction {
  type: typeof SW_UPDATE,
  payload: number
}

export const swUpdate = (registration: any): SwUpdateAction => {
  return {
    type: SW_UPDATE,
    payload: registration,
  };
};
