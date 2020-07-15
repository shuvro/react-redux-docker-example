import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import store, { history } from './store'
import App from './components/app';
import { ErrorBoundary } from './components/common';

import 'sanitize.css/sanitize.css'
import './index.css'
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';

const target = document.querySelector('#root')

render(
  <ErrorBoundary>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div>
          <App />
        </div>
      </ConnectedRouter>
    </Provider>
  </ErrorBoundary>,
  target
)
