import React, {Component} from 'react';
import {Link} from 'react-router';

export default class Root extends Component {
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
    const {LogoutWidget} = this;

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

  static get propTypes() {
    return {
      children: React.PropTypes.node
    };
  }
}
