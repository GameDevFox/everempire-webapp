import React, {Component} from 'react';

export default class LogoutWidget extends Component {
  constructor() {
    super();

    const routeToSignIn = () => {
      this.browserHistory.push('/sign-in');
    };

    this.onLogout = () => {
      this.empireService.signOut()
        .then(routeToSignIn, routeToSignIn);
    };
  }

  render() {
    return (
      <span className="logout-widget">
        <a href="#" onClick={this.onLogout}>Logout</a>
      </span>
    );
  }
}
