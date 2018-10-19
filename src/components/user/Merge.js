import React, { Component } from "react";
import { Link } from "react-router-dom";
import compose from "recompose/compose";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";

import { getPlayersByName, clearPlayers } from "../../actions/playerActions";
import { mergeUser } from "../../actions/userActions";

import Messages from "../common/Messages";

import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

import List from "@material-ui/core/List";
import MenuItem from "@material-ui/core/MenuItem";

import SearchIcon from "@material-ui/icons/Search";
import { Paper } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import { Button } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "space-between"
  },
  form: {
    width: "49%"
  },
  media: {
    width: "49%"
  },
  img: {
    width: "100%"
  },
  input: {
    width: "100%",
    marginBottom: "2rem",
    "& label, & input": {
      [theme.breakpoints.up("md")]: {
        fontSize: "1.5rem"
      }
    }
  },
  button: {
    margin: theme.spacing.unit,
    background: "transparent",
    color: "rgba(0,0,0,.5)",
    transition: ".3s",
    "&:hover, &:active": {
      backgroundColor: "#43A047",
      color: "#fff"
    }
  },
  submit: {
    backgroundColor: "#43A047",
    borderRadius: 40,
    color: "#fff"
  },
  editor: {
    margin: "1rem 0"
  },
  listItem: {
    borderBottom: "1px solid rgba(0,0,0,.2)",
    height: "auto"
  },
  list: {
    width: "100%",
    "& *": {
      [theme.breakpoints.up("md")]: {
        fontSize: "1.5rem"
      }
    },
    "& a": {
      textDecoration: "none"
    }
  },
  paper: {
    padding: "2rem",
    marginBottom: "2rem"
  },
  container: {
    padding: "1rem 10%"
  },
  playerName: {
    display: "flex",
    flexDirection: "column"
  },
  arrowButton: {
    "&:hover": {
      backgroundColor: "transparent",
      color: "#43A047"
    }
  },
  listHeader: {
    display: "flex",
    justifyContent: "space-between"
  },
  pagination: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  none: {
    display: "none"
  },
  success: {
    backgroundColor: "#43A047"
  },
  error: {
    backgroundColor: "#ff5e5e"
  }
});

class Merge extends Component {
  state = {
    search: "",
    open: false
  };

  onClickHandler = id => e => {
    this.props.mergeUser(id);
  };

  onChange = e => {
    if (e.target.value.replace(/[а-я]+/gi, "").length >= 3) {
      this.props.getPlayersByName(
        `${e.target.value.replace(/[а-я]+/gi, "")}&tied=0`
      );
    }
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value.replace(/[а-я]+/gi, "")
    });
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    if (this.props.messages) {
      this.props.history.goBack();
    }

    this.setState({ open: false });
  };

  componentDidMount = () => {
    this.props.clearPlayers();
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors || nextProps.messages) {
      this.setState({ ...this.state, open: true });
    }
  };

  render() {
    const { classes } = this.props;
    const { players } = this.props.players;

    let allPlayersList;

    if (this.props.players && players) {
      allPlayersList = players.all.map(player => (
        <MenuItem className={classes.listItem} key={player.player_id}>
          <img
            src={player.photo}
            alt=""
            style={{ width: 50, marginRight: 8, maxHeight: 50 }}
          />
          <span className={classes.playerName}>
            <b>
              {player.name} {player.patronymic} {player.surename}
            </b>
            <span>
              {player.desc}, {player.comTitle}
            </span>
          </span>
          <Button
            onClick={this.onClickHandler(player.player_id)}
            className={classes.button}
            style={{ marginLeft: "auto" }}
          >
            Привязать
          </Button>
        </MenuItem>
      ));
    }

    return (
      <div className={classes.container}>
        <TextField
          className={classes.input}
          type="text"
          name="search"
          value={this.state.search}
          onChange={this.onChange}
          onInput={e => {
            e.target.value = e.target.value;
          }}
          label="Поиск"
          autoComplete="off"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
        />
        <Paper
          className={
            this.props.players && players ? classes.paper : classes.none
          }
        >
          <div className={classes.listHeader} />
          <List className={classes.list}>{allPlayersList}</List>
        </Paper>
        {this.props.errors ? (
          <Messages
            open={this.state.open}
            message={this.props.errors}
            onClose={this.handleClose}
            classes={classes.error}
          />
        ) : this.props.messages ? (
          <Messages
            open={this.state.open}
            message={this.props.messages}
            onClose={this.handleClose}
            classes={classes.success}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  players: state.players,
  errors: state.errors,
  messages: state.messages
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { getPlayersByName, mergeUser, clearPlayers }
  )
)(Merge);
