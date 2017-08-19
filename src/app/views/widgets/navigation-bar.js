import React, {Component} from 'react';
import {Link} from 'react-router';

export default class NavigationBar extends Component {
  constructor() {
    super();

    this.state = {
      site: 'EverEmpire'
    };
  }

  componentWillMount() {
    this.empireService.getMe()
      .then(me => {
        const userName = me.name || '...';
        this.setState({userName});
      });
  }

  render() {
    const {LogoutWidget} = this;

    const {userName} = this.state;

    return (
      <div className="navigation-bar">
        <div className="site-name">{this.state.site}</div>

        <div className="menu">
          <Link to="/">Home</Link>
          <Link to="/game">Game</Link>
          <Link to="/worlds">Worlds</Link>
        </div>

        <div className="user">
          <b>{userName}</b>
          <LogoutWidget/>
        </div>
      </div>
    );
  }
}
