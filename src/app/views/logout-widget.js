import React, {Component} from 'react';

import {$} from '../services/my-query';

export default class LogoutWidget extends Component {
  constructor() {
    super();

    this.onLogout = this.onLogout.bind(this);
  }

  onLogout() {
    $.auth.signOut();
      // .then(() => {
      //   router.push('/sign-in');
      // });
  }

  render() {
    return (
      <div className="logout-widget">
        <button onClick={this.onLogout}>Logout</button>
      </div>
    );
  }
}
