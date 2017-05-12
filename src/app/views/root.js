import React, {Component} from 'react';

export default class Root extends Component {
  componentDidMount() {
    this.game.init('game');
  }

  render() {
    const {NavigationBar} = this;

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
      children: React.PropTypes.node
    };
  }
}
