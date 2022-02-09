import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './store/configStore';
import { AuthProvider } from './context/AuthContext'

const app = (

  <Provider store={store}>
    <PersistGate loading={<div>Loading...</div>} persistor={persistor}>

      <AuthProvider>
        <App />
      </AuthProvider>

    </PersistGate>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
registerServiceWorker();
