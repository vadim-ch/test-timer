import React from 'react';
import { store } from '../store';
import { getWaitingRegistration } from '../store/reducers/service-worker/selectors';

export const getSecondsDifferenceOfDate = (date: number): number => {
  const diff = Date.now() - date;
  return Math.floor(diff / 1000)
};

export const loadableWithCatchError = path =>
  React.lazy(async () => {
    try {
      const waitingRegistration = getWaitingRegistration(store.getState());
      if (waitingRegistration) {
        updateApp(waitingRegistration);
      } else {
        return await import(`../../src/view/${path}`);
      }
    } catch (e) {
      return null;
    }
  });

export const updateApp = (waitingRegistration) => {
  waitingRegistration.postMessage({ type: 'SKIP_WAITING' });
  waitingRegistration.addEventListener('statechange', e => {
    // @ts-ignore
    if (e.target.state === 'activated') {
      window.location.reload();
    }
  });
};
