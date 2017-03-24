import React, {Component} from 'react';

import {$} from '../services/my-query';

export default class LogoutWidget extends Component {
  constructor() {
    super();

    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    $.auth.signOut();
      // .then(() => {
      //   router.push('/sign-in');
      // });
  }

  render() {
    return (
      <div className="logout-widget">
        <button onClick={this.handleLogout}>Logout</button>
      </div>
    );
  }
}
