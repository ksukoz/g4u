import React, { Component } from "react";
import { Link } from "react-router-dom";
import compose from "recompose/compose";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";

import { getPlayerInfo } from "../../actions/playerActions";

import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

import List from "@material-ui/core/List";
import MenuItem from "@material-ui/core/MenuItem";

import SearchIcon from "@material-ui/icons/Search";
import { Paper } from "@material-ui/core";
import { Table } from "@material-ui/core";
import { TableHead } from "@material-ui/core";
import { TableBody } from "@material-ui/core";
import { TableRow } from "@material-ui/core";
import { TableCell } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";

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
  playerGame: {
    padding: "0 2rem",
    borderRadius: 10,
    marginMottom: "2rem",
    "& td": {
      fontSize: "1.6rem"
    }
  },
  playerData: {
    display: "flex"
  },
  playerList: {
    width: "49%"
  },
  playerItem: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "1.6rem"
  },
  playerTitle: {
    opacity: 0.5
  },
  hr: {
    borderColor: "#43A047"
  }
});

class PlayerItem extends Component {
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

  componentDidMount = () => {
    this.props.getPlayerInfo(this.props.match.params.id);
  };

  render() {
    const { classes } = this.props;
    const { playerInfo } = this.props.players;

    let gamesList;

    if (playerInfo) {
      gamesList = playerInfo.games.map((game, i) => (
        <TableRow key={i}>
          <TableCell>{game.seaTitle}</TableCell>
          <TableCell>{game.tourTitle}</TableCell>
          <TableCell>
            <img src={game.comLogo} alt="" style={{ width: 50, height: 50 }} />{" "}
            <span>{game.comTitle}</span>
          </TableCell>
          <TableCell>{game.plPos}</TableCell>
          <TableCell>{game.gCount}</TableCell>
          <TableCell>
            {game.goal}({game.penalty})
          </TableCell>
          <TableCell>{game.assist}</TableCell>
          <TableCell>{game.score}</TableCell>
        </TableRow>
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
        <div className={classes.playerData}>
          <List className={classes.playerList}>
            <ListItem className={classes.playerItem}>
              <span className={classes.playerTitle}>Дата рождения:</span>
              <span>{playerInfo ? playerInfo.info.birthday : ""}</span>
            </ListItem>
            <ListItem className={classes.playerItem}>
              <span className={classes.playerTitle}>Возраст:</span>
              <span>{playerInfo ? playerInfo.info.age : ""}</span>
            </ListItem>
            <ListItem className={classes.playerItem}>
              <span className={classes.playerTitle}>Рост:</span>
              <span>{playerInfo ? playerInfo.info.stature : ""}</span>
            </ListItem>
            <ListItem className={classes.playerItem}>
              <span className={classes.playerTitle}>Вес:</span>
              <span>{playerInfo ? playerInfo.info.weight : ""}</span>
            </ListItem>
            <ListItem className={classes.playerItem}>
              <span className={classes.playerTitle}>Нога:</span>
              <span>{playerInfo ? playerInfo.info.leg : ""}</span>
            </ListItem>
          </List>

          <hr className={classes.hr} />
          <List className={classes.playerList}>
            <ListItem className={classes.playerItem}>
              <span className={classes.playerTitle}>Команда:</span>
              <span>{playerInfo ? playerInfo.info.title : ""}</span>
            </ListItem>
            <ListItem className={classes.playerItem}>
              <span className={classes.playerTitle}>Позиция:</span>
              <span>{playerInfo ? playerInfo.info.desc : ""}</span>
            </ListItem>
            <ListItem className={classes.playerItem}>
              <span className={classes.playerTitle}>Номер:</span>
              <span>{playerInfo ? playerInfo.info.number : ""}</span>
            </ListItem>
          </List>
        </div>
        <div className={classes.playerGame}>
          <Table className={classes.playerGame}>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell />
                <TableCell>Клуб</TableCell>
                <TableCell>Поз</TableCell>
                <TableCell>И</TableCell>
                <TableCell>Г(П)</TableCell>
                <TableCell>А</TableCell>
                <TableCell>О</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{gamesList}</TableBody>
          </Table>
        </div>
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
    { getPlayerInfo }
  )
)(PlayerItem);
