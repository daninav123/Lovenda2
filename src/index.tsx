import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import FinancePage from './pages/FinancePage';

ReactDOM.render(
  <Provider store={store}>
    <FinancePage />
  </Provider>,
  document.getElementById('root')
);

