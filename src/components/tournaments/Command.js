import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { FormattedMessage } from "react-intl";
import { withStyles } from "@material-ui/core/styles";

import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";

import { getCommandsInfo } from "../../actions/tournamentActions";

const styles = theme => ({
  button: {
    display: "block",
    marginBottom: "2rem",
    padding: "1rem 5rem",
    background: "#fff",
    border: "1px solid #55a462",
    borderRadius: 40,
    boxShadow: "none",
    fontSize: "1.5rem",
    height: "auto",
    "&:hover,&:active": {
      background: "#55a462"
    },

    "&:hover a,&:active": {
      color: "#fff"
    },
    [theme.breakpoints.up("xs")]: {
      width: "100%"
    },
    [theme.breakpoints.up("md")]: {
      width: "23%"
    }
  },
  button_link: {
    display: "block",
    width: "100%",
    color: "#000",
    textDecoration: "none",
    transition: ".3s"
  },
  listItem: {
    borderBottom: "1px solid rgba(0,0,0,.2)",
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
    borderBottom: "1px solid rgba(0,0,0,.2)",
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
    display: "flex",
    [theme.breakpoints.up("xs")]: {
      flexDirection: "column"
    },
    [theme.breakpoints.up("md")]: {
      flexDirection: "row"
    }
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
  },
  listItemCommands: {
    marginBottom: 30,
    borderRadius: 5,
    fontSize: "1.5rem",
    "& strong": {
      padding: "0 10px"
    }
  },
  paper: {
    marginBottom: "2rem",
    "& ul": {
      padding: " 0 2rem"
    }
  },
  matchesList: {
    padding: "15px 2rem!important"
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
            {player.game} Г:
            {player.goal} П:
            {player.assist}
          </span>
        </MenuItem>
      ));

      lastMatches = commands.lastgame.map(game => (
        <MenuItem
          className={classes.listItemCommands}
          key={game.game_id}
          style={{
            background:
              +game.score.split(":")[0] === +game.score.split(":")[1]
                ? "rgba(255, 243, 67, .4)"
                : game.winId === commands.info.cId
                  ? "rgba(67, 160, 71, .4)"
                  : "rgba(255, 94, 94, .4)"
          }}
        >
          {/* {console.log(game.score.split(":"))} */}
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
                {commands.lastgame.splice(0, 5).map(game => (
                  <div
                    className={classes.colorBlock}
                    style={{
                      background:
                        +game.score.split(":")[0] === +game.score.split(":")[1]
                          ? "rgba(255, 243, 67, 1)"
                          : game.winId === commands.info.cId
                            ? "rgba(67, 160, 71, 1)"
                            : "rgba(255, 94, 94, 1)"
                    }}
                  />
                ))}

                {/* <div
                  className={classes.colorBlock}
                  style={{ background: commands.info.colorOut }}
                /> */}
              </span>
            </MenuItem>
          </div>
        </List>
      );
    }

    const id = this.props.match.params.id;
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
          <Paper className={classes.paper}>{statsList} </Paper>
        </div>
        <div className={classes.tablesWrap}>
          <div className={classes.tablesCol}>
            <h2>Последние игры</h2>
            <Paper className={classes.paper}>
              <List className={classes.matchesList}>{lastMatches}</List>
            </Paper>
          </div>
          <div className={classes.tablesCol}>
            <h2>Игроки</h2>
            <Paper className={classes.paper}>
              <List>{playersList}</List>
            </Paper>
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
