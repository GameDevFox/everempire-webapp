import React, {Component} from 'react';
import {Link} from 'react-router';

class Root extends Component {
  constructor(props) {
    super(props);

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
        <LogoutWidget ClassC="Last" ClassD="One"/>

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
