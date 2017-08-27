import React, {Component} from 'react';

import OAuthSignInButton from './widgets/oauth-signin-button';

const MESSAGE = 'message';

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

    this.onMessage = e => {
      const {origin, data} = e;
      const empireServiceOrigin = this.empireServiceUrl.match(/\w+:\/\/[^/]*/);

      const ok = origin.startsWith(empireServiceOrigin);
      if(!ok)
        throw new Error(`Origin of Auth Message [${origin}] does not match empireServiceOrigin: ${empireServiceOrigin}`);

      switch (data.type) {
        case 'auth':
          this.onAuth(data);
          break;
        case 'auth_failure':
          this.onAuthFailure(data);
          break;
        default:
          throw new Error(`Invalid type from auth: ${data.type}`);
      }
    };

    this.onAuth = token => {
      console.log(`Login succeeded!`);
      this.tokenService.onToken(token);

      this.empireService.getMe().then(me => {
        console.log('Me', me);

        this.setState({errors: []});
        this.browserHistory.push('/');
      }, e => {
        console.log('Fail', e);
      });
    };

    this.onAuthFailure = data => {
      console.log('Auth Failure:', data);
      // this.setState({errors: response.data.errors || []});
    };
  }

  componentDidMount() {
    window.addEventListener(MESSAGE, this.onMessage);

    this.empireService.getProviders().then(providers => {
      this.setState({providers});
    });
  }

  componentWillUnmount() {
    window.removeEventListener(MESSAGE, this.onMessage);
  }

  render() {
    let errorListView = null;
    if(this.state.errors.length > 0) {
      const list = this.state.errors.map((error, index) => (<li key={index} className="error">{error}</li>));
      errorListView = (<ul>{list}</ul>);
    }

    const providerButtons = this.state.providers.map(provider => {
      const providerClass = providerClassMap[provider] || provider;
      return <OAuthSignInButton key={provider} provider={providerClass} onClick={this.empireService.auth(provider)}/>;
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
