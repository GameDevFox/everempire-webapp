import React, {Component} from 'react';

export default class LogoutWidget extends Component {
  constructor() {
    super();

    this.onLogout = () => {
      this.empireService.signOut();
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
