const MESSAGE = 'message';

export default class ChannelService {
  constructor(browserHistory, empireService, tokenService, // eslint-disable-line max-params
              genesisService, empireServiceUrl) {
    this.browserHistory = browserHistory;
    this.empireService = empireService;
    this.tokenService = tokenService;
    this.genesisService = genesisService;
    this.empireServiceUrl = empireServiceUrl;

    window.addEventListener(MESSAGE, e => this.onMessage(e));

    // Load token if it exists
    const token = this.tokenService.token;
    if(token)
      this.onSignIn(token);
  }

  signIn(provider) {
    const url = `${this.empireServiceUrl}/auth/${provider}`;
    window.open(url); // eslint-disable-line no-undef
  }

  signOut(destroyToken = true) {
    // Sign out of API
    this.tokenService.clear();
    // Sign out of Genesis
    // this.genesisService.signOut();

    this.browserHistory.push('/sign-in');

    return new Promise((resolve, reject) => {
      if(destroyToken) {
        this.empireService.deleteToken().then(resolve, reject);
      } else {
        resolve();
      }
    });
  }

  // Handlers
  onMessage({ origin, data }) {
    const empireServiceOrigin = this.empireServiceUrl.match(/\w+:\/\/[^/]*/);

    const ok = origin.startsWith(empireServiceOrigin);
    if(!ok)
      throw new Error(`Origin of Auth Message [${origin}] does not match empireServiceOrigin: ${empireServiceOrigin}`);

    switch(data.type) {
      case 'auth':
        this.onSignIn(data);
        break;
      case 'auth_failure':
        this.onSignInFail(data);
        break;
      default:
        throw new Error(`Invalid type from auth: ${data.type}`);
    }
  }

  onSignIn(token) {
    console.log(`Login succeeded!`);

    // Set token
    this.tokenService.token = token;

    // Authenticate with Genesis
    this.genesisService.auth(token.token);

    // Re-route
    this.empireService.getMe().then(me => {
      console.log('Me', me);
      this.browserHistory.push('/');
    }, e => {
      console.log('Fail', e);
    });
  }

  onSignInFail(data) {
    console.log('Auth Failure:', data);
  }
}
