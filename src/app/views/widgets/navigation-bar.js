import React, {Component} from 'react';
import {Link} from 'react-router';

export default class NavigationBar extends Component {
  constructor() {
    super();

    this.state = {
      site: 'EverEmpire',
      user: {}
    };
  }

  componentWillMount() {
    this.authP.then($ => {
      const user = $.auth.user;
      this.setState({user});
    });
  }

  render() {
    const {LogoutWidget} = this;

    const user = this.state.user;
    const email = user.signedIn ? user.email : '...';

    return (
      <div className="navigation-bar">
        <div className="site-name">{this.state.site}</div>

        <div className="menu">
          <Link to="/">Home</Link>
          <Link to="/game">Game</Link>
          <Link to="/worlds">Worlds</Link>
        </div>

        <div className="user">
          <b>{email}</b>
          <LogoutWidget/>
        </div>
      </div>
    );
  }
}
