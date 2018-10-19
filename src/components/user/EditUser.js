import React, { Component } from "react";
import { Link } from "react-router-dom";
import compose from "recompose/compose";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "react-image-crop/dist/ReactCrop.css";
import { editUser, getUser, getSportType } from "../../actions/userActions";
import { getCountries } from "../../actions/commonActions";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";

import { getLeagues } from "../../actions/leagueActions";

const styles = theme => ({
  root: {
    width: 250,
    margin: "0 auto"
  },
  playerLink: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    color: "#000",
    margin: "2rem 0"
  },
  playerTitle: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    "& small": {
      paddingTop: "2rem",
      fontWeight: 500
    }
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: "50%",
    marginRight: "1rem"
  },
  // input: {
  //   width: "24%"
  // },
  input_wrap: {
    display: "flex",

    flexDirection: "column",
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
    sportId: "",
    sport: "",
    locale: "",
    country: "",
    lang: ""
  };

  onChangeHandler = e => {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  };

  onSubmitHandler = e => {
    e.preventDefault();

    let user = JSON.parse(localStorage.getItem("user"));
    user.lang = this.state.lang;
    console.log(user);

    const editUser = {
      nickname: this.state.nickname,
      email: this.state.email,
      league_id: this.state.league_id,
      locale: this.state.locale,
      sport_type_id: this.state.sportId
    };

    this.props.editUser(editUser);
    localStorage.setItem("user", JSON.stringify(user));
    window.location.reload();
  };

  componentWillMount() {
    this.props.getLeagues();
  }

  componentDidMount() {
    this.props.getUser();
    this.props.getCountries();
    this.props.getSportType();

    const league = JSON.parse(localStorage.getItem("user")).league;
    this.setState({
      ...this.state,
      league_id: league
    });
  }

  componentWillReceiveProps(nextProps) {
    let user;
    let countries;
    let lang;

    if (
      nextProps.users.user !== null &&
      nextProps.users.sport !== null &&
      nextProps.common.countries !== null &&
      nextProps.lang.locale !== null
    ) {
      user = nextProps.users.user;
      countries = nextProps.common.countries;
      lang =
        // JSON.parse(localStorage.getItem("user")).lang !== null
        //   ? JSON.parse(localStorage.getItem("user")).lang
        //   :
        nextProps.lang.locale;

      this.setState({
        ...this.state,
        nickname: user.nickname,
        email: user.email,
        league: user.league,
        sportId: user.sportId,
        sport: nextProps.users.sport.filter(
          item => item.sport_type_id === user.sportId
        )[0].title,
        locale: user.locale,
        country: countries.filter(
          countryItem => countryItem.iso === user.locale.toUpperCase()
        )[0].name,
        lang: lang
      });
    }
  }

  render() {
    const { classes } = this.props;
    const { leaguesList } = this.props.leagues;
    const { countries } = this.props.common;
    const { user, sport } = this.props.users;
    let leaguesOptions;
    let countriesOptions;
    let sportOptions;

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
    }
    // countryName = countries.filter(
    //   country => country.iso === this.state.locale.toUpperCase()
    // );
    if (sport !== null) {
      sportOptions = sport.map(item => (
        <MenuItem key={item.sport_type_id} value={item.sport_type_id}>
          {item.title}
        </MenuItem>
      ));
      // countryName = countries.filter(
      //   country => country.iso === this.state.locale.toUpperCase()
      // );
    }

    return (
      <div className={classes.root}>
        <div className={classes.form}>
          <form className="player__form" onSubmit={this.onSubmitHandler}>
            <div className={classes.input_wrap}>
              <FormControl className={classes.input}>
                <InputLabel htmlFor="lang" className={classes.select}>
                  <FormattedMessage id="user.langLabel" />
                </InputLabel>
                <Select
                  className={classes.select}
                  value={this.state.lang}
                  onChange={this.onChangeHandler}
                  displayEmpty
                  inputProps={{
                    name: "lang",
                    id: "lang"
                  }}
                >
                  <MenuItem value="en">English</MenuItem>
                  <MenuItem value="ru">Русский</MenuItem>
                  <MenuItem value="uk">Українська</MenuItem>
                </Select>
              </FormControl>
              <FormControl className={classes.input}>
                <InputLabel htmlFor="locale" className={classes.select}>
                  <FormattedMessage id="user.localeLabel" />
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
              <FormControl className={classes.input}>
                <InputLabel htmlFor="league_id" className={classes.select}>
                  <FormattedMessage id="user.leagueLabel" />
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
                <InputLabel htmlFor="sportId" className={classes.select}>
                  Вид спорта
                </InputLabel>
                <Select
                  className={classes.select}
                  value={this.state.sportId}
                  onChange={this.onChangeHandler}
                  displayEmpty
                  inputProps={{
                    name: "sportId",
                    id: "sportId"
                  }}
                >
                  <MenuItem value={this.state.sportId} disabled>
                    {this.state.sport}
                  </MenuItem>
                  {sportOptions}
                </Select>
              </FormControl>
              <TextField
                label={<FormattedMessage id="user.nickLabel" />}
                name="nickname"
                className={classes.input}
                value={this.state.nickname}
                onChange={this.onChangeHandler}
                margin="normal"
              />
              <TextField
                label={<FormattedMessage id="user.emailLabel" />}
                name="email"
                className={classes.input}
                value={this.state.email}
                onChange={this.onChangeHandler}
                margin="normal"
              />
            </div>
            <Button
              variant="contained"
              color="primary"
              size="large"
              type="submit"
              className={classes.submit}
            >
              {<FormattedMessage id="user.save" />}
            </Button>
          </form>
          <div>
            {user && user.status ? (
              <Link to="/edit-player" className={classes.playerLink}>
                <img className={classes.img} src={user.photo} alt="" />
                <div>
                  <h2 className={classes.playerTitle}>
                    <span>
                      {user.name} {user.surename}
                    </span>
                    <small>
                      {user.status === "1"
                        ? "Подтвержден"
                        : "Запрос на привязку профиля подан"}
                    </small>
                  </h2>
                </div>
              </Link>
            ) : (
              <div>
                <Link to="/merge" className={classes.playerLink}>
                  Привязать существующий профиль
                </Link>
                <Link to="/add-player" className={classes.playerLink}>
                  Создать нового игрока
                </Link>
              </div>
            )}
          </div>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              Сменить пароль
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <form onSubmit={this.onPasswordSubmit}>
                <TextField
                  label="Новый пароль"
                  name="password"
                  className={classes.input}
                  value={this.state.password}
                  onChange={this.onChangeHandler}
                  margin="normal"
                />
                <TextField
                  label="Подтвердите пароль"
                  name="password2"
                  className={classes.input}
                  value={this.state.password2}
                  onChange={this.onChangeHandler}
                  margin="normal"
                />
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  type="submit"
                  className={classes.submit}
                >
                  {<FormattedMessage id="user.save" />}
                </Button>
              </form>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  players: state.players,
  leagues: state.leagues,
  users: state.users,
  common: state.common,
  lang: state.lang
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { editUser, getLeagues, getUser, getCountries, getSportType }
  )
)(EditUser);
