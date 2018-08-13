import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

import PrivateRoute from "./components/common/PrivateRoute";

import { setUser } from "./actions/authActions";

import "./App.css";
import News from "./components/news/News";
import AddNews from "./components/news/AddNews";
import ChooseLeague from "./components/auth/ChooseLeague";
import AddPlayer from "./components/players/AddPlayer";
import EditUser from "./components/user/EditUser";
import Header from "./components/layout/Header";
import Navigation from "./components/layout/Navigation";
import InProgress from "./components/layout/InProgress";

if (localStorage.user) {
  const user = JSON.parse(localStorage.getItem("user"));
  store.dispatch(setUser(user));
}

class App extends Component {
  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />

            <PrivateRoute path="/" component={Header} />
            <main className="main">
              <PrivateRoute path="/" component={Navigation} />
              <div className="container">
                <Switch>
                  <Route exact path="/choose-league" component={ChooseLeague} />
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/" component={News} />
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/add-news" component={AddNews} />
                </Switch>
                <Switch>
                  <PrivateRoute
                    exact
                    path="/add-player"
                    component={AddPlayer}
                  />
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/edit-user" component={EditUser} />
                </Switch>
                <Switch>
                  <PrivateRoute
                    exact
                    path="/in-progress"
                    component={InProgress}
                  />
                </Switch>
              </div>
            </main>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
