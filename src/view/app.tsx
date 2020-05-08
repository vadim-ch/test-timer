import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../store';
import Timer from './containers/timer';
import { PageContainer } from './elements';

function App() {
  return (
    <Provider store={store}>
      <PageContainer>
        <Timer />
      </PageContainer>
    </Provider>
  );
}

export default App;
