import React, {Component} from 'react';
import {Link} from 'react-router';

export default class Root extends Component {
  constructor() {
    super();

    this.state = {
      site: 'EverEmpire',
      user: {},
      message: ''
    };

    this.onMsgChange = event => {
      const message = event.target.value;
      this.setState({message});
    };
    this.onMsgClick = () => {
      const message = this.state.message;
      console.log(message);
      this.genesisService.cmd('set', {message});
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
          <div>{this.state.site}</div>

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

        <p>
          <input onChange={this.onMsgChange}/><button onClick={this.onMsgClick}>Send</button>
        </p>

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
