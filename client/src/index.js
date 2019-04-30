import "materialize-css/dist/css/materialize.min.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";

// Main react component
import App from "./components/App";
// All reducers in /reducers/index.js get imported
import reducers from "./reducers";
// Modify state in the redux store

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
  // Create top level provider with the state store
  // This allows us to access our state everywhere
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
