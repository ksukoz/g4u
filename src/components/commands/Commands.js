import React, { Component } from "react";
import { Link } from "react-router-dom";
import compose from "recompose/compose";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";

import { getCommands } from "../../actions/commandActions";

import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

import List from "@material-ui/core/List";
import MenuItem from "@material-ui/core/MenuItem";

import SearchIcon from "@material-ui/icons/Search";

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
  chip: {
    backgroundColor: "#effcf1",
    marginLeft: "1rem",
    "&:focus": {
      backgroundColor: "#effcf1"
    }
  },
  editor: {
    margin: "1rem 0"
  },
  listItem: {
    border: "1px solid rgba(0,0,0,.2)",
    height: "auto"
  },
  list: {
    width: "100%",
    "& *": {
      [theme.breakpoints.up("md")]: {
        fontSize: "1.5rem"
      }
    }
  }
});

class Commands extends Component {
  state = {
    search: ""
  };

  onChange = e => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
  };

  componentDidMount = () => {
    this.props.getCommands();
  };

  render() {
    const { classes } = this.props;
    const { commands } = this.props.commands;
    let myCommandsList;
    let favoriteCommandsList;
    let allCommandsList;

    if (this.props.commands && commands) {
      myCommandsList = (
        <Link to={`/command/${command.cId}`} key={command.cId}>
          <MenuItem className={classes.listItem}>
            <img src={commands.my.logo} alt="" />
            {commands.my.title}
          </MenuItem>
        </Link>
      );

      favoriteCommandsList = commands.liked.map(command => (
        <Link to={`/command/${command.cId}`} key={command.cId}>
          <MenuItem className={classes.listItem}>
            <img src={command.logo} alt="" />
            {command.title}
          </MenuItem>
        </Link>
      ));

      allCommandsList = commands.all.map(command => (
        <Link to={`/command/${command.cId}`} key={command.cId}>
          <MenuItem className={classes.listItem}>
            <img
              src={command.logo}
              alt=""
              style={{ width: 50, marginRight: 8 }}
            />
            {command.title}
          </MenuItem>
        </Link>
      ));
    }

    return (
      <div>
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
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
        />
        <div>
          <h2>Мои команды</h2>
          <List className={classes.list}>{myCommandsList}</List>
        </div>
        <div>
          <h2>Любимые команды</h2>
          <List className={classes.list}>{favoriteCommandsList}</List>
        </div>
        <div>
          <h2>Команды</h2>
          <List className={classes.list}>{allCommandsList}</List>
        </div>
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
    { getCommands }
  )
)(Commands);
