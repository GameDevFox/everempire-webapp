import React, {Component} from 'react';

export default class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      errors: [],
      email: 'email@domain.com',
      password: 'password'
    };

    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onRegister = this.onRegister.bind(this);
    this.onLogin = this.onLogin.bind(this);
  }

  onEmailChange(event) {
    this.setState({email: event.target.value});
  }

  onPasswordChange(event) {
    this.setState({password: event.target.value});
  }

  onRegister() {
    this.authP.then($ => $.auth.emailSignUp({
      email: this.state.email,
      password: this.state.password,
      password_confirmation: this.state.password // eslint-disable-line camelcase
    }));
  }

  onLogin() {
    this.authP.then($ => {
      console.log('Login', this.state.email, this.state.password);
      return $.auth.emailSignIn({
        email: this.state.email,
        password: this.state.password
      });
    }).then(response => {
      console.log(`Login succeeded for ${response.data.email}`);

      this.setState({errors: []});
      this.browserHistory.push('/');
    }, response => {
      console.log('Oops...');
      console.log(response);

      this.setState({errors: response.data.errors});
    });
  }

  render() {
    let errorListView = null;
    if(this.state.errors.length > 0) {
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
          <input id="email" type="text" value={this.state.email} onChange={this.onEmailChange}/>
        </div>

        <div className="password">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" value={this.state.password} onChange={this.onPasswordChange}/>
        </div>

        <button onClick={this.onRegister}>Register</button>
        <button onClick={this.onLogin}>Login</button>
      </div>
    );
  }
}
