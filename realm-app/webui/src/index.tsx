import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import App from './App';
import reportWebVitals from './reportWebVitals';

import './styles/globals.scss'
import { CookiesProvider } from 'react-cookie';
import { BrowserRouter } from 'react-router-dom';

const container = document.getElementById('root')!;

render(
  <React.StrictMode>
    <Provider store={store}>
      <CookiesProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CookiesProvider>

    </Provider>
  </React.StrictMode>
  , container
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
