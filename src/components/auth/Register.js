import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { withStyles } from "@material-ui/core/styles";
import { registerUser } from "../../actions/authActions";
import { getCountries } from "../../actions/commonActions";

import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const styles = {
  root: {
    width: "max-content",
    margin: "0 auto",
    textAlign: "center",
    marginTop: "15vh",
    padding: "2rem 5rem"
  },
  input: {
    width: 300,
    marginBottom: "1rem"
  },
  submit: {
    backgroundColor: "#43A047",
    borderRadius: 40,
    width: 300,
    color: "#fff",
    marginBottom: "2rem"
  },
  link: {
    textDecoration: "none",
    color: "#000",
    transition: ".3s",
    "&:hover": {
      color: "rgba(0,0,0,.8)"
    }
  },
  error: {
    color: "#ff5e5e",
    paddingBottom: "2rem"
  }
};

class Register extends Component {
  state = {
    nickname: "",
    email: "",
    password: "",
    password2: "",
    locale: "",
    error: ""
  };

  onSubmitHandler = e => {
    e.preventDefault();

    const newUser = {
      nickname: this.state.nickname,
      email: this.state.email,
      password: this.state.password,
      locale: this.state.locale
    };

    if (this.state.password !== this.state.password2)
      this.setState({
        ...this.state,
        error: "Пароли не совпадают"
      });

    this.props.registerUser(newUser, this.props.history);
  };

  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors.length > 0) {
      this.setState({
        ...this.state,
        error: nextProps.errors
      });
    }
  }

  componentDidMount() {
    this.props.getCountries();
  }

  render() {
    const { classes } = this.props;
    const { countries } = this.props.common;
    let countriesOptions;

    if (countries !== null) {
      countriesOptions = countries.map(country => {
        return (
          <MenuItem key={country.iso} value={country.iso}>
            {country.name}
          </MenuItem>
        );
      });
    }

    return (
      <Paper className={classes.root}>
        <h1>Зарегистрироваться</h1>
        <p>Создать свой аккаунт</p>
        <form onSubmit={this.onSubmitHandler}>
          <div>
            <TextField
              className={classes.input}
              type="text"
              name="nickname"
              value={this.state.nickname}
              onChange={this.onChangeHandler}
              label="Ваше имя"
            />
          </div>
          <div>
            <TextField
              className={classes.input}
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.onChangeHandler}
              label="Ваш email"
            />
          </div>
          <div>
            <TextField
              className={classes.input}
              type="password"
              name="password"
              label="Ваш пароль"
              value={this.state.password}
              onChange={this.onChangeHandler}
            />
          </div>
          <div>
            <TextField
              className={classes.input}
              type="password"
              name="password2"
              label="Подтвердите пароль"
              value={this.state.password2}
              onChange={this.onChangeHandler}
            />
          </div>
          <div>
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
                {countriesOptions}
              </Select>
            </FormControl>
          </div>
          <Button variant="contained" type="submit" className={classes.submit}>
            Зарегистрироваться
          </Button>
          <div className={classes.error}>
            <small variant="caption" component="small">
              {this.state.error}
            </small>
          </div>
        </form>

        <Link to="/login" className={classes.link}>
          Войти
        </Link>
      </Paper>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  common: state.common
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { registerUser, getCountries }
  )
)(withRouter(Register));
