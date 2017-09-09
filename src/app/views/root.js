import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Root extends Component {
  componentDidMount() {
    this.game.init('game', this.genesisService);
  }

  render() {
    const { NavigationBar } = this;

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
