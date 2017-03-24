import React, {Component} from 'react';
import {Link} from 'react-router';

import LogoutWidget from './logout-widget';

class Root extends Component {
  constructor() {
    super();

    this.state = {
      site: 'EverEmpire',
      user: {
        email: 'email@domain.com'
      }
    };
  }

  render() {
    window.props = this.props;

    return (
      <div>
        <h1>Welcome to {this.state.site}</h1>

        <div className="user">
          Hello, <b>{this.state.user.email}</b>
        </div>
        <LogoutWidget/>

        <div><Link to="/">Home</Link></div>
        <div><Link to="/worlds">Worlds</Link></div>

        {this.props.children}
      </div>
    );
  }
}

window.React = React;

Root.propTypes = {
  children: React.PropTypes.node
};

export default Root;
