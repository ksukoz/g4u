import React, { Component } from "react";
import compose from "recompose/compose";
import { connect } from "react-redux";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { editUser, getUser } from "../../actions/userActions";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputFile from "../common/InputFile";

import Button from "@material-ui/core/Button";

import { getLeagues } from "../../actions/leagueActions";

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
    width: "32%"
  },
  input_wrap: {
    display: "flex",
    justifyContent: "space-between"
  },
  select: {
    width: "100%"
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
    color: "#fff",
    marginBottom: "1rem"
  },
  chip: {
    backgroundColor: "#effcf1",
    marginLeft: "1rem",
    "&:focus": {
      backgroundColor: "#effcf1"
    }
  }
});

class EditUser extends Component {
  state = {
    nickname: "",
    email: "",
    // locale: "",
    league_id: "",
    league: ""
  };

  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmitHandler = e => {
    e.preventDefault();

    const editUser = {
      nickname: this.state.nickname,
      email: this.state.email,
      // locale: this.state.locale,
      league_id: this.state.league_id
    };

    this.props.editUser(editUser);
  };

  componentWillMount() {
    this.props.getLeagues();
  }

  componentDidMount() {
    this.props.getUser();
    const league = JSON.parse(localStorage.getItem("user")).league;
    this.setState({
      ...this.state,
      league_id: league
    });
  }

  render() {
    const { classes } = this.props;
    const { leaguesList } = this.props.leagues;
    let leaguesOptions;
    if (leaguesList !== null) {
      leaguesOptions = leaguesList.map(league => {
        return (
          <MenuItem key={league.id} value={league.id}>
            {league.title}
          </MenuItem>
        );
      });
    }

    return (
      <div className={classes.root}>
        <div className={classes.form}>
          <form className="player__form" onSubmit={this.onSubmitHandler}>
            <div className={classes.input_wrap}>
              <TextField
                label="Никнейм"
                name="nickname"
                className={classes.input}
                value={this.state.nickname}
                onChange={this.onChangeHandler}
                margin="normal"
              />
              <TextField
                label="Email"
                name="email"
                className={classes.input}
                value={this.state.email}
                onChange={this.onChangeHandler}
                margin="normal"
              />
              <FormControl className={classes.input}>
                <InputLabel htmlFor="league_id">Выбрать лигу</InputLabel>
                <Select
                  className={classes.select}
                  value={this.state.league_id}
                  defaultValue={this.state.league}
                  onChange={this.onChangeHandler}
                  inputProps={{
                    name: "league_id",
                    id: "league_id"
                  }}
                >
                  {leaguesOptions}
                </Select>
              </FormControl>
            </div>
            <Button
              variant="contained"
              color="primary"
              size="large"
              type="submit"
              className={classes.submit}
            >
              Сохранить
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  players: state.players,
  leagues: state.leagues
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { editUser, getLeagues, getUser }
  )
)(EditUser);
