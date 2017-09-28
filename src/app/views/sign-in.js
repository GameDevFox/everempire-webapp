import React, { Component } from 'react';

import OAuthSignInButton from './widgets/oauth-signin-button';

const providerClassMap = {
  google_oauth2: 'google' // eslint-disable-line camelcase
};

export default class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      errors: [],
      providers: []
    };

    this.signIn = function(provider) {
      return () => {
        this.sessionService.signIn(provider);
      };
    };
  }

  componentDidMount() {
    this.empireService.getProviders().then(providers => {
      this.setState({ providers });
    });
  }

  render() {
    let errorListView = null;
    if(this.state.errors.length > 0) {
      const list = this.state.errors.map((error, index) => (<li key={index} className="error">{error}</li>));
      errorListView = (<ul>{list}</ul>);
    }

    const providerButtons = this.state.providers.map(provider => {
      const providerClass = providerClassMap[provider] || provider;
      return <OAuthSignInButton key={provider} provider={providerClass} onClick={this.signIn(provider)}/>;
    });

    return (
      <div>
        <h1>Sign In</h1>

        {errorListView}

        <div className="oauth">
          {providerButtons}
        </div>
      </div>
    );
  }
}
