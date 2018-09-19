import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { FormattedMessage } from "react-intl";
import { withStyles } from "@material-ui/core/styles";

import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import MenuItem from "@material-ui/core/MenuItem";

import { getCommandsInfo } from "../../actions/tournamentActions";

const styles = theme => ({
  button_link: {
    display: "block",
    width: "100%",
    color: "#000",
    textDecoration: "none",
    transition: ".3s"
  },
  listItem: {
    border: "1px solid rgba(0,0,0,.2)",
    "& strong": {
      padding: "0 2rem"
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "1.5rem"
    }
  },
  listItemPlayers: {
    display: "flex",
    justifyContent: "space-between",
    border: "1px solid rgba(0,0,0,.2)",
    "& strong": {
      padding: "0 2rem"
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "1.5rem"
    }
  },
  success: {
    backgroundColor: "#43A047"
  },
  error: {
    backgroundColor: "#ff5e5e"
  },
  flexDiv: {
    display: "flex"
  },
  centered: {
    display: "flex",
    alignSelf: "center",
    margin: "0 2rem",
    "& span": {
      alignSelf: "center",
      paddingLeft: "2rem",
      [theme.breakpoints.up("md")]: {
        fontSize: "1.5rem"
      }
    }
  },
  avatar: {
    height: 150,
    width: 150
  },
  tablesWrap: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between"
  },
  tablesCol: {
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "49%"
    }
  }
});

class Command extends Component {
  componentDidMount = () => {
    this.props.getCommandsInfo(this.props.match.params.id);
  };

  render() {
    const { classes } = this.props;
    const { commands } = this.props.tournaments;
    let playersList;
    let lastMatches;

    if (commands) {
      playersList = commands.players.map((player, i) => (
        <MenuItem className={classes.listItemPlayers} key={player.id}>
          <span>{player.name}</span>
          <span>
            И:
            {player.games} Г:
            {player.goal} П:
            {player.assist}
          </span>
        </MenuItem>
      ));

      lastMatches = commands.lastgame.map(game => (
        <MenuItem className={classes.listItem} key={game.game_id}>
          <span>{game.inTitle}</span>
          <strong>{game.score}</strong>
          <span>{game.outTitle}</span>
        </MenuItem>
      ));
    }

    const id = this.props.match.params.id;
    return (
      <div>
        {commands ? (
          <div className={classes.flexDiv}>
            <Avatar
              alt=""
              src={commands.info.logo}
              className={classes.avatar}
            />
            <h1 className={classes.centered}>{commands.info.title}</h1>
            <div className={classes.centered}>
              <h2>Всего игроков:</h2>
              <span>{commands.countPl}</span>
            </div>
            <div className={classes.centered}>
              <h2>Средний возраст:</h2>
              <span>{commands.average}</span>
            </div>
          </div>
        ) : (
          ""
        )}
        <div className={classes.tablesWrap}>
          <div className={classes.tablesCol}>
            <h2>Последние игры</h2>
            <List>{lastMatches}</List>
          </div>
          <div className={classes.tablesCol}>
            <h2>Игроки</h2>
            <List>{playersList}</List>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tournaments: state.tournaments
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { getCommandsInfo }
  )
)(Command);
