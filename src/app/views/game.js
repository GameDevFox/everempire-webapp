import React, {Component} from 'react';

export default class Game extends Component {
  componentDidMount() {
    this.game.load('game');
  }

  componentWillUnmount() {
    this.game.unload('game');
  }

  render() {
    return (
      <div>
        <div id="game"/>
      </div>
    );
  }
}
