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
      this.empireClient.cmd('set', {message});
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
      <div>
        <h1>Welcome to {this.state.site}</h1>

        <p>
          <input onChange={this.onMsgChange}/><button onClick={this.onMsgClick}>Send</button>
        </p>

        <div className="user">
          Hello, <b>{email}</b>
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
