import React, {Component} from 'react';

export default class LogoutWidget extends Component {
  constructor() {
    super();
    this.onLogout = this.onLogout.bind(this);
  }

  onLogout() {
    this.authP.then($ => $.auth.signOut())
      .then(() => this.browserHistory.push('/sign-in'));
  }

  render() {
    return (
      <span className="logout-widget">
        <a href="#" onClick={this.onLogout}>Logout</a>
      </span>
    );
  }
}
