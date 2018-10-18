import React, { Component } from "react";
import { Link } from "react-router-dom";
import compose from "recompose/compose";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";

import { getCommands, getCommandsByName } from "../../actions/commandActions";

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

class Commands extends Component {
  state = {
    search: ""
  };

  onChangeHandler = e => {
    if (e.target.value.replace(/[а-я]+/gi, "").length >= 3) {
      this.props.getCommandsByName(e.target.value.replace(/[а-я]+/gi, ""));
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
    this.props.getCommands(0);
  };

  render() {
    const { classes } = this.props;
    const { commands } = this.props.commands;
    let myCommandsList;
    let favoriteCommandsList;
    let allCommandsList;

    if (this.props.commands && commands) {
      myCommandsList = commands.my.map(command => (
        <Link to={`/commands/${command.cId}`} key={command.cId}>
          <MenuItem className={classes.listItem}>
            <img
              src={command.logo}
              alt=""
              style={{ maxHeight: 100, maxWidth: 100, marginRight: 8 }}
            />
            {command.title}
          </MenuItem>
        </Link>
      ));

      favoriteCommandsList = commands.liked.map(command => (
        <Link to={`/commands/${command.cId}`} key={command.cId}>
          <MenuItem className={classes.listItem}>
            <img
              src={command.logo}
              alt=""
              style={{ marginRight: 8, maxHeight: 50, maxWidth: 50 }}
            />
            {command.title}
          </MenuItem>
        </Link>
      ));

      allCommandsList = commands.all.map(command => (
        <Link to={`/commands/${command.cId}`} key={command.cId}>
          <MenuItem className={classes.listItem}>
            <img
              src={command.logo}
              alt=""
              style={{ marginRight: 8, maxHeight: 50, maxWidth: 50 }}
            />
            {command.title}
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
          onChange={this.onChangeHandler}
          onInput={e => {
            e.target.value = e.target.value;
          }}
          label="Поиск"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
          autoComplete="off"
        />
        <Paper className={classes.paper}>
          <h2>Мои команды</h2>
          <List className={classes.list}>{myCommandsList}</List>
        </Paper>
        <Paper className={classes.paper}>
          <h2>Любимые команды</h2>
          <List className={classes.list}>{favoriteCommandsList}</List>
        </Paper>
        <Paper className={classes.paper}>
          <div className={classes.listHeader}>
            <h2>Команды</h2>
            {this.props.commands && commands ? (
              <div className={classes.pagination}>
                <IconButton
                  className={classes.arrowButton}
                  disabled={commands.filters.prev === null}
                  onClick={this.onClickHandler(commands.filters.prev)}
                >
                  <ArrowBackIosIcon />
                </IconButton>

                <span style={{ fontSize: "2rem", color: "#43A047" }}>
                  {+commands.filters.current + 1}
                </span>
                <IconButton
                  className={classes.arrowButton}
                  disabled={!commands.filters.next}
                  onClick={this.onClickHandler(commands.filters.next)}
                >
                  <ArrowForwardIosIcon />
                </IconButton>
              </div>
            ) : (
              ""
            )}
          </div>
          <List className={classes.list}>{allCommandsList}</List>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  commands: state.commands
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { getCommands, getCommandsByName }
  )
)(Commands);
