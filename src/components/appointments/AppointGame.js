import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { FormattedMessage } from "react-intl";
import { withStyles } from "@material-ui/core/styles";

import { getCurrentGame } from "../../actions/gameActions";

import List from "@material-ui/core/List";
import MenuItem from "@material-ui/core/MenuItem";

import Button from "@material-ui/core/Button";

const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "space-between"
  },
  checkbox: {
    color: "#43A047",
    "&$checked": {
      color: "#43A047"
    }
  },
  checked: {},
  input: {
    width: "40%"
  },
  input_wrap: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "1rem"
  },
  select: {
    width: "100%",
    paddingTop: "1rem"
  },
  button: {
    display: "block",
    marginBottom: "2rem",
    padding: "1rem 5rem",
    background: "#fff",
    border: "1px solid #55a462",
    boxShadow: "none",
    "&:hover,&:active": {
      background: "#55a462"
    },

    "&:hover a,&:active": {
      color: "#fff"
    }
  },
  button_link: {
    display: "block",
    width: "100%",
    color: "#000",
    textDecoration: "none",
    transition: ".3s"
  },
  submit: {
    backgroundColor: "#43A047",
    borderRadius: 40,
    color: "#fff",
    marginBottom: "1rem"
  },
  listItem: {
    border: "1px solid rgba(0,0,0,.2)"
  },
  success: {
    backgroundColor: "#43A047"
  },
  error: {
    backgroundColor: "#ff5e5e"
  },
  game_wrap: {
    display: "flex",
    justifyContent: "space-between"
  },
  game: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& img": {
      height: "25rem"
    }
  }
});

class AppointGame extends Component {
  state = {
    gameId: "",
    game: null
  };

  componentDidMount() {
    this.setState({
      ...this.state,
      gameId: this.props.match.url.replace(/\D/g, "")
    });

    this.props.getCurrentGame(this.props.match.url.replace(/\D/g, ""));
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors || nextProps.messages) {
      this.setState({ ...this.state, open: true });
    } else if (nextProps.games.currentGame !== null) {
      this.setState({
        ...this.state,
        currentGame: nextProps.games.currentGame
      });
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        {+JSON.parse(localStorage.getItem("user")).personal_type === 1 ||
        +JSON.parse(localStorage.getItem("user")).personal_type === 7 ? (
          <Link
            to={`/event/add/${this.state.gameId}`}
            className={classes.button_link}
          >
            <Button className={classes.button} variant="extendedFab">
              Создать событие
            </Button>
          </Link>
        ) : (
          ""
        )}
        {this.state.currentGame ? (
          <div className={classes.game_wrap}>
            <div className={classes.game}>
              <img src={this.state.currentGame.info.in.logo} alt="" />
              <h3>{this.state.currentGame.info.in.title}</h3>
            </div>
            <div className={classes.game}>
              <img src={this.state.currentGame.info.out.logo} alt="" />
              <h3>{this.state.currentGame.info.out.title}</h3>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  games: state.games,
  errors: state.errors,
  messages: state.messages
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { getCurrentGame }
  )
)(AppointGame);
