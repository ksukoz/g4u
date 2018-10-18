import React, { Component } from "react";
import { Link } from "react-router-dom";
import compose from "recompose/compose";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";

import { getPlayers, getPlayersByName } from "../../actions/playerActions";

import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

import List from "@material-ui/core/List";
import MenuItem from "@material-ui/core/MenuItem";

import SearchIcon from "@material-ui/icons/Search";
import { Paper } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
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
  }
});

class Players extends Component {
  state = {
    search: ""
  };

  onChange = e => {
    if (e.target.value.replace(/[а-я]+/gi, "").length >= 3) {
      this.props.getPlayersByName(e.target.value.replace(/[а-я]+/gi, ""));
    }
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value.replace(/[а-я]+/gi, "")
    });
  };

  onClickHandler = offset => e => {
    this.props.getCommands(offset);
  };

  componentDidMount = () => {
    this.props.getPlayers(0);
  };

  render() {
    const { classes } = this.props;
    const { players } = this.props.players;

    let favoritePlayersList;
    let allPlayersList;

    if (this.props.players && players) {
      favoritePlayersList = players.liked.map(player => (
        <Link to={`/players/${player.player_id}`} key={player.player_id}>
          <MenuItem className={classes.listItem}>
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
          </MenuItem>
        </Link>
      ));

      allPlayersList = players.all.map(player => (
        <Link to={`/players/${player.player_id}`} key={player.player_id}>
          <MenuItem className={classes.listItem}>
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
          </MenuItem>
        </Link>
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
        <Paper className={classes.paper}>
          <h2>Любимые игроки</h2>
          <List className={classes.list}>{favoritePlayersList}</List>
        </Paper>
        <Paper className={classes.paper}>
          <div className={classes.listHeader}>
            <h2>Игроки</h2>
            {this.props.players && players ? (
              <div className={classes.pagination}>
                <IconButton
                  className={classes.arrowButton}
                  disabled={players.filters.prev === null}
                  onClick={this.onClickHandler(players.filters.prev)}
                >
                  <ArrowBackIosIcon />
                </IconButton>

                <span style={{ fontSize: "2rem", color: "#43A047" }}>
                  {+players.filters.current + 1}
                </span>
                <IconButton
                  className={classes.arrowButton}
                  disabled={!players.filters.next}
                  onClick={this.onClickHandler(players.filters.next)}
                >
                  <ArrowForwardIosIcon />
                </IconButton>
              </div>
            ) : (
              ""
            )}
          </div>
          <List className={classes.list}>{allPlayersList}</List>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  players: state.players
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { getPlayers, getPlayersByName }
  )
)(Players);
