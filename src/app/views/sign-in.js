import React, {Component} from 'react';

import {$} from '../services/my-query';

export default class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      errors: [],
      email: 'email@domain.com',
      password: 'password'
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  handleRegister() {
    $.auth.emailSignUp({
      email: this.state.email,
      password: this.state.password,
      password_confirmation: this.state.password // eslint-disable-line camelcase
    });
  }

  handleLogin() {
    console.log('Login', this.state.email, this.state.password);
    $.auth.emailSignIn({
      email: this.state.email,
      password: this.state.password
    })
      .then(response => {
        console.log(`Login succeeded for ${response.data.email}`);
        this.setState({errors: []});

        // console.log(router);
        // router.push('/');
      }, response => {
        console.log(response);
        this.setState({errors: response.data.errors});
      });
  }

  render() {
    let errorListView = null;
    if (this.state.errors.length > 0) {
      const list = this.state.errors.map((error, index) => (<li key={index} className="error">{error}</li>));
      errorListView = (<ul>{list}</ul>);
    }

    return (
      <div>
        <h1>Sign In</h1>
        Please Log In or Sign Up

        {errorListView}

        <div className="email">
          <label htmlFor="email">Email</label>
          <input id="email" type="text" value={this.state.email} onChange={this.handleEmailChange}/>
        </div>

        <div className="password">
          <label htmlFor="password">Password</label>
          <input id="password" type="text" value={this.state.password} onChange={this.handlePasswordChange}/>
        </div>

        <button onClick={this.handleRegister}>Register</button>
        <button onClick={this.handleLogin}>Login</button>
      </div>
    );
  }
}
