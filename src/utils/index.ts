import React from 'react';
import { store } from '../store';

export const getSecondsDifferenceOfDate = (date: number): number => {
  const diff = Date.now() - date;
  return Math.floor(diff / 1000)
};

export const loadableWithCatchError = path =>
  React.lazy(async () => {
    try {
      const {sw: { registration }} = store.getState();
      if (registration && registration.waiting) {
        updateApp(registration);
      } else {
        return await import(`../../src/view/${path}`);
      }
    } catch (e) {
      return null;
    }
  });

export const updateApp = (registration) => {
  registration.waiting.postMessage({ type: 'SKIP_WAITING' });
  registration.waiting.addEventListener('statechange', e => {
    // @ts-ignore
    if (e.target.state === 'activated') {
      window.location.reload();
    }
  });
};
