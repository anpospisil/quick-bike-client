import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import {store, persistor} from "./store";
import React from 'react';
import "bootstrap/dist/css/bootstrap.css"
import ReactDOM from 'react-dom';
import './style.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.render(
  <React.StrictMode>
    <Router>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
    <App />
    </PersistGate>
    </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
