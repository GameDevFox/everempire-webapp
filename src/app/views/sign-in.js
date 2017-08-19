import React, {Component} from 'react';

import OAuthSignInButton from './widgets/oauth-signin-button';
import empireService from '../factory/empire-service';

const AUTH = 'auth';
const AUTH_FAILURE = 'auth_failure';

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

    this.onAuth = ({data: token}) => {
      console.log(`Login succeeded! Token: ${token}`);
      this.empireService.token = token;

      this.empireService.getMe().then(me => {
        console.log('Me', me);

        this.setState({errors: []});
        this.browserHistory.push('/');
      }, e => {
        console.log('Fail', e);
      });
    };

    this.onAuthFailure = e => {
      console.log('Auth Failure:');
      console.log(e.data);

      // this.setState({errors: response.data.errors || []});
    };
  }

  componentDidMount() {
    window.addEventListener(AUTH, this.onAuth);
    window.addEventListener(AUTH_FAILURE, this.onAuthFailure);

    this.empireService.getProviders().then(providers => {
      this.setState({providers});
    });
  }

  componentWillUnmount() {
    window.removeEventListener(AUTH, this.onAuth);
    window.removeEventListener(AUTH_FAILURE, this.onAuthFailure);
  }

  render() {
    let errorListView = null;
    if(this.state.errors.length > 0) {
      const list = this.state.errors.map((error, index) => (<li key={index} className="error">{error}</li>));
      errorListView = (<ul>{list}</ul>);
    }

    const providerButtons = this.state.providers.map(provider => {
      const providerClass = providerClassMap[provider] || provider;
      return <OAuthSignInButton key={provider} provider={providerClass} onClick={empireService.auth(provider)}/>;
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
