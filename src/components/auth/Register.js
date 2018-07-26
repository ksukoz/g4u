import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";

class Register extends Component {
  state = {
    nickname: '',
    email: '',
    password: '',
    password2: '',
    locale: 'ru',
    errors: {}
  }

  onSubmitHandler = e => {
    e.preventDefault();

    const newUser = {
      nickname: this.state.nickname,
      email: this.state.email,
      password: this.state.password,
      locale: this.state.locale
    }
    
    if(this.state.password !== this.state.password2) console.log('Пароли не совпадают');

    this.props.registerUser(newUser, this.props.history);
  }

  onChangeHandler = e => {
    this.setState({[e.target.name]: e.target.value});
  }

  render() {
    const { errors } = this.state;

    return (
      <div>
        <h1>Зарегистрироваться</h1>
        <p>Создать свой аккаунт</p>
        <form noValidate onSubmit={this.onSubmitHandler}>
          <input 
            type="text" 
            name="nickname" 
            placeholder="Ваше имя" 
            value={this.state.nickname}
            onChange={this.onChangeHandler}
          />
          <input 
            type="email" 
            name="email"  
            placeholder="Ваш email" 
            value={this.state.email} 
            onChange={this.onChangeHandler}
          />
          <input 
            type="password" 
            name="password" 
            placeholder="Ваш пароль" 
            value={this.state.password}
            onChange={this.onChangeHandler}
          />
          <input 
            type="password" 
            name="password2"  
            placeholder="Подтвердите пароль" 
            value={this.state.password2} 
            onChange={this.onChangeHandler}
          />
          <select name="locale" value={this.state.locale} onChange={this.onChangeHandler}>
            <option defaultValue value="ru">Русский</option>
            <option value="en">Английский</option>
          </select>
          <input type="submit" value="Войти"/>
        </form>

        <Link to='/login'>Войти</Link>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));