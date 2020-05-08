import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/browser';
import './index.css';
import { store } from './store';
import { swUpdate } from './store/actions/sw-update';
import App from './view/app';
import * as serviceWorker from './serviceWorker';

Sentry.init({
  release: `react@${__VERSION__}`,
  dsn: 'https://c216cd488b2c40cbb0e2bcdff892a595@o387706.ingest.sentry.io/5223409',
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.register({
  onUpdate: registration => store.dispatch(swUpdate(registration)),
});
