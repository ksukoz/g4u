import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Register extends Component {
  state = {
    nickname: '',
    email: '',
    password: '',
    password2: '',
    locale: 'ru'
  }

  onSubmitHandler = e => {
    e.preventDefault();
    
    if(this.state.password !== this.state.password2) console.log('Пароли не совпадают');
  }

  onChangeHandler = e => {
    this.setState({[e.target.name]: e.target.value});
  }

  render() {
    return (
      <div>
        <h1>Зарегистрироваться</h1>
        <p>Создать свой аккаунт</p>
        <form onSubmit={this.onSubmitHandler}>
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

        <Link to='/register'>Создать свой аккаунт</Link>
      </div>
    )
  }
}

export default Register;