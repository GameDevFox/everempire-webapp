import React, {Component} from 'react';
import {Link} from 'react-router';

export default class Root extends Component {
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

  componentDidMount() {
    this.game.init('game');
  }

  render() {
    const {LogoutWidget} = this;

    const user = this.state.user;
    const email = user.signedIn ? user.email : '...';

    return (
      <div>
        <div id="hidden-game"/>

        <div className="menu-bar">
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
