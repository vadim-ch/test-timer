import React from 'react';
import { Provider } from 'react-redux';
import IdleTimer from 'react-idle-timer'
import { store } from '../store';
import { getWaitingRegistration } from '../store/reducers/service-worker/selectors';
import { updateApp } from '../utils';
import Timer from './containers/timer';
import { PageContainer } from './elements';

const idleMinutes = 1;

function App() {
  const onIdle = () => {
    const waitingRegistration = getWaitingRegistration(store.getState());
    if (waitingRegistration) {
      updateApp(waitingRegistration);
    }
  };

  return (
    <Provider store={store}>
      <IdleTimer
        element={document}
        onIdle={onIdle}
        debounce={250}
        timeout={1000 * 60 * idleMinutes} />
      <PageContainer>
        <Timer />
      </PageContainer>
    </Provider>
  );
}

export default App;
