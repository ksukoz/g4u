import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

import { setUser } from "./actions/authActions";

import "./App.css";
import News from "./components/news/News";
import AddNews from "./components/news/AddNews";
import ChooseLeague from "./components/auth/ChooseLeague";

if (localStorage.user) {
  const user = JSON.parse(localStorage.getItem("user"));
  store.dispatch(setUser(user));
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/" component={News} />
            <Route exact path="/add-news" component={AddNews} />
            <Route exact path="/choose-league" component={ChooseLeague} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
