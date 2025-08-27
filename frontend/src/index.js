// index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'; // Provider ko import kiya
import store from './store'; // Apne store ko import kiya
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Yahaan humne poori App ko Provider se wrap kar diya */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
