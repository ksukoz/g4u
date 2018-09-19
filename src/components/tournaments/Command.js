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
  },
  tablesColStat: {
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "50%"
    }
  },
  colorWrap: {
    display: "flex"
  },
  colorBlock: {
    width: 15,
    height: 15,
    border: "1px solid rgba(0,0,0,.5)",
    borderRadius: 5,
    margin: "0 10px"
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
    let statsList;

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

      statsList = (
        <List className={classes.tablesWrap}>
          <div className={classes.tablesColStat}>
            <MenuItem className={classes.listItemPlayers}>
              <span>Позиция</span>
              <span>{+commands.stat.position + 1}</span>
            </MenuItem>
            <MenuItem className={classes.listItemPlayers}>
              <span>Очки</span>
              <span>{commands.stat.pts}</span>
            </MenuItem>
            <MenuItem className={classes.listItemPlayers}>
              <span>Игры</span>
              <span>{commands.stat.cGame}</span>
            </MenuItem>
          </div>
          <div className={classes.tablesColStat}>
            <MenuItem className={classes.listItemPlayers}>
              <span>В-Н-П</span>
              <span>{commands.stat.stat}</span>
            </MenuItem>
            <MenuItem className={classes.listItemPlayers}>
              <span>З-П</span>
              <span>
                {commands.stat.scored}-{commands.stat.missed} (
                {+commands.stat.diff > 0
                  ? `+${commands.stat.diff}`
                  : commands.stat.diff}
                )
              </span>
            </MenuItem>
            <MenuItem className={classes.listItemPlayers}>
              <span>Форма</span>
              <span className={classes.colorWrap}>
                <div
                  className={classes.colorBlock}
                  style={{ background: commands.info.colorIn }}
                />
                <div
                  className={classes.colorBlock}
                  style={{ background: commands.info.colorOut }}
                />
              </span>
            </MenuItem>
          </div>
        </List>
      );
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
          </div>
        ) : (
          ""
        )}
        <div>
          <h2>Статистика</h2>
          {statsList}
        </div>
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
