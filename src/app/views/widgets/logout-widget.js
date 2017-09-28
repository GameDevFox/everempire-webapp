import React, { Component } from 'react';

export default class LogoutWidget extends Component {
  constructor() {
    super();

    this.onLogout = () => {
      // TODOS: Pass in signOut() directly
      this.sessionService.signOut();
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
