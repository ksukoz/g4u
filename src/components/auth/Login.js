import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Login extends Component {
  state = {
    email: '',
    password: ''
  }

  onSubmitHandler = e => {

  }

  render() {
    return (
      <div>
        <h1>Войти</h1>
        <p>Войти в свой аккаунт</p>
        <form onSubmit={this.onSubmitHandler}>
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
          <input type="submit" value="Войти"/>
        </form>

        <Link to='/register'>Создать свой аккаунт</Link>
      </div>
    )
  }
}

export default Login;