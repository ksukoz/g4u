import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { FormattedMessage } from "react-intl";
import { withStyles } from "@material-ui/core/styles";

import {
  getCurrentGame,
  getEventSettings,
  addGameEvent
} from "../../actions/gameActions";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

import Messages from "../common/Messages";

import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import List from "@material-ui/core/List";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";

import TextField from "@material-ui/core/TextField";
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
  rounds: {
    margin: "0 auto",
    marginBottom: "1rem",
    display: "flex",
    flexDirection: "column",
    height: 100,
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 500,
      flexDirection: "row"
    }
  },
  roundsBtn: {
    border: "1px solid #43A047",
    maxWidth: "100%",
    [theme.breakpoints.up("md")]: {
      width: "auto"
    }
  },
  selected: {
    backgroundColor: "#43A047",
    color: "#fff"
  },
  checked: {},
  input: {
    width: "100%",
    marginBottom: "1rem"
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
  },
  success: {
    backgroundColor: "#43A047"
  },
  error: {
    backgroundColor: "#ff5e5e"
  }
});

class AddEvent extends Component {
  state = {
    open: false,
    gameId: "",
    currentGame: null,
    minutes: "",
    type: "",
    assistevent: "0",
    command: "0",
    player: "0",
    assistant: "0",
    comment: ""
  };

  onChangeHandler = e => {
    if (e.target.name === "comment") {
      if (e.target.value.length > 500) {
        this.setState({
          ...this.state,
          [e.target.name]: e.target.value.slice(0, 500)
        });
      } else {
        this.setState({
          ...this.state,
          [e.target.name]: e.target.value
        });
      }
    } else {
      this.setState({
        ...this.state,
        [e.target.name]: e.target.value.replace(/[а-я]+/gi, "")
      });
    }
  };

  handleChange = (event, command) => {
    this.setState({
      ...this.state,
      command
    });
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    if (this.props.messages) {
      this.setState({ open: false }, this.props.history.goBack());
    }

    this.setState({ open: false });
  };

  onSubmitHandler = e => {
    e.preventDefault();

    const newEvent = {
      type_event_id: this.state.type,
      command_id: this.state.command,
      player_id: this.state.player,
      comment: this.state.comment,
      assist_id: this.state.assistant,
      minute: this.state.minutes,
      assist_type_id: this.state.assistevent
    };

    this.props.addGameEvent(this.state.gameId, newEvent);
  };

  componentDidMount() {
    this.setState({
      ...this.state,
      gameId: this.props.match.url.replace(/\D/g, "")
    });

    this.props.getCurrentGame(this.props.match.url.replace(/\D/g, ""));
    this.props.getEventSettings(this.props.match.url.replace(/\D/g, ""));
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors || nextProps.messages) {
      this.setState({ ...this.state, open: true });
    } else if (nextProps.games.currentGame !== null) {
      this.setState({
        ...this.state,
        currentGame: nextProps.games.currentGame,
        minutes: (
          (Date.now() - Date.parse(nextProps.games.currentGame.date)) /
          60000
        ).toFixed(),
        command: nextProps.games.currentGame.info.in.command_id
      });
    }
  };

  render() {
    const { classes } = this.props;
    const { settings } = this.props.games;
    let settingsList;
    let playersList;
    let assistantsList;
    let assistanteventsList;

    if (settings !== null) {
      settingsList = settings.type.map(option => (
        <MenuItem value={option.type_event_id} key={option.type_event_id}>
          {option.title}
        </MenuItem>
      ));

      assistantsList = settings.players[this.state.command].map(player => (
        <MenuItem value={player.plid} key={player.plid}>
          #{player.number} {player.name}
        </MenuItem>
      ));

      assistanteventsList = settings.assistevent.map(event => (
        <MenuItem value={event.type_event_id} key={event.type_event_id}>
          {event.title}
        </MenuItem>
      ));

      if (this.state.command) {
        playersList = settings.players[this.state.command].map(player => (
          <MenuItem value={player.plid} key={player.plid}>
            #{player.number} {player.name}
          </MenuItem>
        ));
      }
    }

    return (
      <div>
        <Button
          size="large"
          className={classes.button}
          style={{ marginBottom: "1rem" }}
          onClick={() => this.props.history.goBack()}
        >
          Назад
        </Button>
        {this.state.currentGame !== null ? (
          <BottomNavigation
            value={this.state.command}
            onChange={this.handleChange}
            showLabels
            className={classes.rounds}
          >
            <BottomNavigationAction
              classes={{ selected: classes.selected, root: classes.roundsBtn }}
              label={this.state.currentGame.info.in.title}
              value={this.state.currentGame.info.in.command_id}
            />
            <BottomNavigationAction
              classes={{ selected: classes.selected, root: classes.roundsBtn }}
              label={this.state.currentGame.info.out.title}
              value={this.state.currentGame.info.out.command_id}
            />
          </BottomNavigation>
        ) : (
          ""
        )}
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
        <form onSubmit={this.onSubmitHandler}>
          <TextField
            label="Минута матча"
            name="minutes"
            className={classes.input}
            value={this.state.minutes}
            onChange={this.onChangeHandler}
            type="number"
            margin="normal"
          />
          <FormControl className={classes.input}>
            <InputLabel htmlFor="type">Тип события</InputLabel>
            <Select
              value={this.state.type}
              className={classes.select}
              onChange={this.onChangeHandler}
              inputProps={{
                name: "type",
                id: "type"
              }}
            >
              <MenuItem value="" />
              {settingsList}
            </Select>
          </FormControl>
          <FormControl className={classes.input}>
            <InputLabel htmlFor="player">Игрок</InputLabel>
            <Select
              value={this.state.player}
              className={classes.select}
              onChange={this.onChangeHandler}
              inputProps={{
                name: "player",
                id: "player"
              }}
            >
              {playersList}
            </Select>
          </FormControl>
          <FormControl className={classes.input}>
            <InputLabel htmlFor="assistevent">Тип события</InputLabel>
            <Select
              value={this.state.assistevent}
              className={classes.select}
              onChange={this.onChangeHandler}
              inputProps={{
                name: "assistevent",
                id: "assistevent"
              }}
            >
              <MenuItem value="0" />
              {assistanteventsList}
            </Select>
          </FormControl>
          <FormControl className={classes.input}>
            <InputLabel htmlFor="assistant">Ассистент</InputLabel>
            <Select
              value={this.state.assistant}
              className={classes.select}
              onChange={this.onChangeHandler}
              inputProps={{
                name: "assistant",
                id: "assistant"
              }}
            >
              <MenuItem value="0">Неизвестно</MenuItem>
              {assistantsList}
            </Select>
          </FormControl>
          <TextField
            label="Комментарий"
            name="comment"
            multiline
            rows={4}
            className={classes.input}
            value={this.state.comment}
            onChange={this.onChangeHandler}
            margin="normal"
          />

          <Button size="large" type="submit" className={classes.submit}>
            Сохранить
          </Button>
        </form>
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
    { getCurrentGame, getEventSettings, addGameEvent }
  )
)(AddEvent);
