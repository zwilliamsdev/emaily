import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";

import App from "./components/App";
// All reducers in /reducers/index.js get imported
import reducers from "./reducers";

const store = createStore(reducers, {}, applyMiddleware());

ReactDOM.render(
  // Create top level provider with the state store
  // This allows us to access our state everywhere
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
