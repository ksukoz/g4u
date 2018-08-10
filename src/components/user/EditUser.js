import React, { Component } from "react";
import compose from "recompose/compose";
import { connect } from "react-redux";
import "react-image-crop/dist/ReactCrop.css";
import { editUser, getUser } from "../../actions/userActions";
import { getCountries } from "../../actions/commonActions";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

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
    width: "24%"
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
  }
});

class EditUser extends Component {
  state = {
    nickname: "",
    email: "",
    league_id: "",
    league: "",
    locale: "",
    country: ""
  };

  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmitHandler = e => {
    e.preventDefault();

    const editUser = {
      nickname: this.state.nickname,
      email: this.state.email,
      league_id: this.state.league_id,
      locale: this.state.locale
    };

    this.props.editUser(editUser);
  };

  componentWillMount() {
    this.props.getLeagues();
  }

  componentDidMount() {
    this.props.getUser();
    this.props.getCountries();

    const league = JSON.parse(localStorage.getItem("user")).league;
    this.setState({
      ...this.state,
      league_id: league
    });
  }

  componentWillReceiveProps(nextProps) {
    let user;
    let countries;
    if (nextProps.users.user !== null && nextProps.common.countries !== null) {
      user = nextProps.users.user;
      countries = nextProps.common.countries;
      this.setState({
        ...this.state,
        nickname: user.nickname,
        email: user.email,
        league: user.league,
        locale: user.locale,
        country: countries.filter(
          countryItem => countryItem.iso === user.locale.toUpperCase()
        )[0].name
      });
    }
  }

  render() {
    const { classes } = this.props;
    const { leaguesList } = this.props.leagues;
    const { countries } = this.props.common;
    let leaguesOptions;
    let countriesOptions;
    let countryName;

    if (leaguesList !== null) {
      leaguesOptions = leaguesList.map(league => {
        return (
          <MenuItem key={league.id} value={league.id}>
            {league.title}
          </MenuItem>
        );
      });
    }

    if (countries !== null) {
      countriesOptions = countries.map(country => {
        return (
          <MenuItem key={country.iso} value={country.iso}>
            {country.name}
          </MenuItem>
        );
      });
      countryName = countries.filter(
        country => country.iso === this.state.locale.toUpperCase()
      );
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
                <InputLabel htmlFor="league_id" className={classes.select}>
                  Выбрать лигу
                </InputLabel>
                <Select
                  className={classes.select}
                  value={this.state.league_id}
                  onChange={this.onChangeHandler}
                  displayEmpty
                  inputProps={{
                    name: "league_id",
                    id: "league_id"
                  }}
                >
                  <MenuItem value={this.state.league_id} disabled>
                    {this.state.league}
                  </MenuItem>
                  {leaguesOptions}
                </Select>
              </FormControl>
              <FormControl className={classes.input}>
                <InputLabel htmlFor="locale" className={classes.select}>
                  Выбрать страну
                </InputLabel>
                <Select
                  className={classes.select}
                  value={this.state.locale}
                  onChange={this.onChangeHandler}
                  displayEmpty
                  inputProps={{
                    name: "locale",
                    id: "locale"
                  }}
                >
                  <MenuItem value={this.state.locale} disabled>
                    {this.state.country}
                  </MenuItem>
                  {countriesOptions}
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
  leagues: state.leagues,
  users: state.users,
  common: state.common
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { editUser, getLeagues, getUser, getCountries }
  )
)(EditUser);
