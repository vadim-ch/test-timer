import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/browser';
import './index.css';
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
  onUpdate(registration) {
    console.error('Обновить?');
    window['update'] = () => {
      if (registration.waiting) {
        registration.waiting.postMessage({ type: 'SKIP_WAITING' });
        registration.waiting.addEventListener('statechange', e => {
          // @ts-ignore
          if (e.target.state === 'activated') {
            window.location.reload();
          }
        });
      }
    }
  }
});
