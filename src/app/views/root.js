import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Root extends Component {
  componentDidMount() {
    this.game.init('game', this.genesisService);
  }

  render() {
    const { NavigationBar } = this;

    // TODOS: Move hidden-game to index.html to fix race condition error
    // (i.e. phaser getting rendered at bottom by default)
    return (
      <div>
        <div id="hidden-game"/>

        <NavigationBar/>

        {this.props.children}
      </div>
    );
  }

  static get propTypes() {
    return {
      children: PropTypes.node
    };
  }
}
