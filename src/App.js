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
import Tournaments from "./components/tournaments/Tournaments";
import SubTournaments from "./components/tournaments/SubTournaments";
import InfoSubTour from "./components/tournaments/InfoSubTour";
import Command from "./components/tournaments/Command";
import Commands from "./components/commands/Commands";
import CommandItem from "./components/commands/CommandItem";
import EditCommandPlayer from "./components/commands/EditCommandPlayer";
import AddCommandPlayer from "./components/commands/AddCommandPlayer";
import Game from "./components/games/Game";
import MyGames from "./components/games/MyGames";
import EditEvent from "./components/appointments/EditEvent";
import AddPhoto from "./components/appointments/AddPhoto";
import AddVideo from "./components/appointments/AddVideo";
import Players from "./components/players/Players";
import PlayerItem from "./components/players/PlayerItem";
import Merge from "./components/user/Merge";

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
                  <PrivateRoute exact path="/commands" component={Commands} />
                </Switch>
                <Switch>
                  <PrivateRoute
                    exact
                    path="/commands/:id"
                    component={CommandItem}
                  />
                </Switch>
                <Switch>
                  <PrivateRoute
                    exact
                    path="/player/:id"
                    component={EditCommandPlayer}
                  />
                </Switch>
                <Switch>
                  <PrivateRoute
                    exact
                    path="/commands/player/add"
                    component={AddCommandPlayer}
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
                  <PrivateRoute exact path="/players" component={Players} />
                </Switch>
                <Switch>
                  <PrivateRoute
                    exact
                    path="/players/:id"
                    component={PlayerItem}
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
                    path="/appointgame/:id"
                    component={AppointGame}
                  />
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/game/:id" component={Game} />
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/mygames" component={MyGames} />
                </Switch>
                <Switch>
                  <PrivateRoute
                    exact
                    path="/event/add/:id"
                    component={AddEvent}
                  />
                </Switch>
                <Switch>
                  <PrivateRoute
                    exact
                    path="/event/edit/:id"
                    component={EditEvent}
                  />
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/edit-user" component={EditUser} />
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/merge" component={Merge} />
                </Switch>
                <Switch>
                  <PrivateRoute
                    exact
                    path="/in-progress"
                    component={InProgress}
                  />
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/cities" component={Location} />
                </Switch>
                <Switch>
                  <PrivateRoute
                    exact
                    path="/tournaments/:id"
                    component={Tournaments}
                  />
                </Switch>
                <Switch>
                  <PrivateRoute
                    exact
                    path="/subtournaments/:id"
                    component={SubTournaments}
                  />
                </Switch>
                <Switch>
                  <PrivateRoute
                    exact
                    path="/subtourinfo/:id"
                    component={InfoSubTour}
                  />
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/command/:id" component={Command} />
                </Switch>
                <Switch>
                  <PrivateRoute
                    exact
                    path="/addphoto/:id"
                    component={AddPhoto}
                  />
                </Switch>
                <Switch>
                  <PrivateRoute
                    exact
                    path="/addvideo/:id"
                    component={AddVideo}
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
