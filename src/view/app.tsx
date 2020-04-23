import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../store';
import Timer from './containers/timer';

function App() {
  return (
    <Provider store={store}>
      <Timer />
    </Provider>
  );
}

export default App;
