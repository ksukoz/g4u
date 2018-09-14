import React, { Component } from "react";
import { Link } from "react-router-dom";
import compose from "recompose/compose";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { withStyles } from "@material-ui/core/styles";

import Messages from "../common/Messages";

import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import MenuItem from "@material-ui/core/MenuItem";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";

import { getCommand } from "../../actions/commandActions";

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
  expDetails: {
    margin: "0 2rem",

    [theme.breakpoints.up("md")]: {
      fontSize: "1.5rem"
    }
  },
  expSummary: {
    [theme.breakpoints.up("md")]: {
      fontSize: "1.5rem"
    }
  },
  link: {
    width: "100%",
    textDecoration: "none",
    color: "#000"
  },
  button: {
    background: "transparent",
    border: "1px solid #43A047",
    color: "rgba(0,0,0,.5)",
    borderRadius: 40,
    transition: ".3s",
    "&:hover, &:active": {
      backgroundColor: "#43A047",
      color: "#fff"
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "1.5rem"
    }
  }
});

class CommandItem extends Component {
  componentDidMount = () => {
    this.props.getCommand(this.props.match.params.id);
  };
  render() {
    const { classes } = this.props;
    const { command } = this.props.commands;
    const id = this.props.match.params.id;

    let tournamentsList;
    let lastMatches;
    let playersList;

    if (command) {
      tournamentsList = command.subtours.map(subtour => (
        <MenuItem className={classes.listItem} key={subtour.tourId}>
          {subtour.title}
        </MenuItem>
      ));

      lastMatches = command.lastgame.map(game => (
        <MenuItem className={classes.listItem} key={game.game_id}>
          <span>{game.inTitle}</span>
          <strong>{game.score}</strong>
          <span>{game.outTitle}</span>
        </MenuItem>
      ));

      playersList = command.players.map(player => (
        <ExpansionPanelDetails
          key={player.player_id}
          className={classes.expDetails}
        >
          <Link to={`/player/${player.player_id}`} className={classes.link}>
            <MenuItem className={classes.listItem}>
              <img src={player.photo} alt="" />
              {player.name} ({player.status})
            </MenuItem>
          </Link>
        </ExpansionPanelDetails>
      ));
    }
    return (
      <div>
        {command ? (
          <div className={classes.flexDiv}>
            <Avatar alt="" src={command.info.logo} className={classes.avatar} />
            <h1 className={classes.centered}>{command.info.title}</h1>
            <div className={classes.centered}>
              <h2>Всего игроков:</h2>
              <span>{command.countPl}</span>
            </div>
            <div className={classes.centered}>
              <h2>Средний возраст:</h2>
              <span>{command.average}</span>
            </div>
          </div>
        ) : (
          ""
        )}
        <div>
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              className={classes.expSummary}
            >
              <span style={{ alignSelf: "center", paddingRight: 8 }}>
                Состав команды
              </span>

              {command && command.edit ? (
                <Button
                  size="large"
                  className={classes.button}
                  onClick={() =>
                    this.props.history.push("/commands/player/add")
                  }
                >
                  Добавить игрока
                </Button>
              ) : (
                ""
              )}
            </ExpansionPanelSummary>
            {playersList}
          </ExpansionPanel>
        </div>
        <div>
          <h2>Последние игры</h2>
          <List>{lastMatches}</List>
        </div>
        <div>
          <h2>Турниры</h2>
          <List>{tournamentsList}</List>
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
    { getCommand }
  )
)(CommandItem);
