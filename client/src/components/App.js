import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
// Import * (ALL) as actions from actions
import * as actions from "../actions";

import Header from "./Header";
const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;
const Landing = () => <h2>Landing</h2>;

// Class based component - only want to run it once
// Versus every refresh
class App extends Component {
  // As soon as component loads
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route path="/surveys/new" component={SurveyNew} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
// connect first argument reserved map state to props argument
// second argument we pass in all our action creators (actions)
// Immediately invokes on the (App) component as props
export default connect(
  null,
  actions
)(App);
