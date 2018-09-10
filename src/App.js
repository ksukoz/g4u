import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ConnectedIntlProvider from "./components/common/ConnectedIntlProvider";
import store from "./store";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

import PrivateRoute from "./components/common/PrivateRoute";

import { setUser } from "./actions/authActions";

import "./App.css";
import News from "./components/news/News";
import AddNews from "./components/news/AddNews";
import EditNews from "./components/news/EditNews";

import ChooseLeague from "./components/auth/ChooseLeague";
import AddPlayer from "./components/players/AddPlayer";
import EditPlayer from "./components/players/EditPlayer";
import EditUser from "./components/user/EditUser";

import Header from "./components/layout/Header";
import Navigation from "./components/layout/Navigation";
import InProgress from "./components/layout/InProgress";
import Appointments from "./components/appointments/Appointments";
import AppointGame from "./components/appointments/AppointGame";
import AddEvent from "./components/appointments/AddEvent";

import Location from "./components/tournaments/Location";

if (localStorage.user) {
  const user = JSON.parse(localStorage.getItem("user"));
  store.dispatch(setUser(user));
  // document.addEventListener("paste", e => e.preventDefault());
  document.addEventListener("copy", e => e.preventDefault());
  document.addEventListener("cut", e => e.preventDefault());
}

class App extends Component {
  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <ConnectedIntlProvider>
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
                    path="/news/edit/:id"
                    component={EditNews}
                  />
                </Switch>
                <Switch>
                  <PrivateRoute
                    exact
                    path="/add-player"
                    component={AddPlayer}
                  />
                </Switch>
                <Switch>
                  <PrivateRoute
                    exact
                    path="/edit-player"
                    component={EditPlayer}
                  />
                </Switch>
                <Switch>
                  <PrivateRoute
                    exact
                    path="/appointments"
                    component={Appointments}
                  />
                </Switch>
                <Switch>
                  <PrivateRoute
                    exact
                    path="/game/:id"
                    component={AppointGame}
                  />
                </Switch>
                <Switch>
                  <PrivateRoute
                    exact
                    path="/event/add/:id"
                    component={AddEvent}
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
                <Switch>
                  <PrivateRoute
                    exact
                    path="/tournaments/cities"
                    component={Location}
                  />
                </Switch>
              </div>
            </main>
          </div>
        </Router>
      </ConnectedIntlProvider>
    );
  }
}

export default App;
