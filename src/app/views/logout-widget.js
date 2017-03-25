import React, {Component} from 'react';

export default class LogoutWidget extends Component {
  constructor(props) {
    super(props);

    this.onLogout = this.onLogout.bind(this);
  }

  onLogout() {
    this.authP.then($ => $.auth.signOut())
      .then(() => this.browserHistory.push('/sign-in'));
  }

  render() {
    return (
      <div className="logout-widget">
        <button onClick={this.onLogout}>Logout</button>
      </div>
    );
  }
}
