import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import NotificationsCenter from './features/notifications/NotificationsCenter';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <NotificationsCenter />
    </Provider>
  </React.StrictMode>
);
