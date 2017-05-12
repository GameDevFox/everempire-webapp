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
      <div className="game">
        <div id="game"/>
      </div>
    );
  }
}
