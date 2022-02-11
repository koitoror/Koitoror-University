import React from "react";
import ReactDOM from "react-dom";
// import { Provider } from "react-redux";
// import { PersistGate } from 'redux-persist/integration/react'

import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
// import { persistor, store } from './redux/store';
import { AuthReduxProvider } from './redux/store';
import { AuthContextProvider } from './context/AuthContext'

const app = (

  // <Provider store={store}>
  //   <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
  <AuthReduxProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
  </AuthReduxProvider>
  //   </PersistGate>
  // </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
registerServiceWorker();
