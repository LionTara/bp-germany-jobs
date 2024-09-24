import React from 'react';
import ReactDOM from 'react-dom/client'; // Updated import
import { Provider } from 'react-redux';
import store from './store/store';
import App from './App';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container); // Create a root for rendering

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
