import React, {Component} from 'react';
import PropTypes from 'prop-types';

import _ from 'lodash';

// CSS
import 'bootstrap-social/bootstrap-social.css';

export default class OAuthSignInButton extends Component {
  render() {
    const provider = this.props.provider;

    return (
      <div>
        <button className={`btn btn-social btn-${provider}`} onClick={this.props.onClick}>
          <span className={`fa fa-${provider}`} aria-hidden="true"/>
          Sign in with {_.capitalize(provider)}
        </button>
      </div>
    );
  }
}

OAuthSignInButton.propTypes = {
  provider: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};
