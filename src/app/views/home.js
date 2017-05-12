import React, {Component} from 'react';

export default class Home extends Component {
  constructor() {
    super();

    this.state = {
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

  render() {
    return (
      <div>
        <h1>Welcome to EverEmpire</h1>

        <p>
          <input onChange={this.onMsgChange}/><button onClick={this.onMsgClick}>Send</button>
        </p>
      </div>
    );
  }
}
