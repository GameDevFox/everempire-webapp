import moment from 'moment';

const renewTokenMsBefore = 60000;

export default class TokenService {
  constructor($, empireService, browserHistory) {
    this.$ = $;
    this.empireService = empireService;
    this.browserHistory = browserHistory;

    // Load token if it exists
    const token = this.token;
    if(token)
      this.onToken(token);
  }

  get token() {
    return JSON.parse(sessionStorage.getItem('token'));
  }

  set token(tokenData) {
    let beforeSend;

    if(tokenData) {
      sessionStorage.setItem('token', JSON.stringify(tokenData));
      beforeSend = xhr => {
        xhr.setRequestHeader('Token', tokenData.token);
      };
    } else {
      sessionStorage.removeItem('token');
    }

    this.$.ajaxSetup({beforeSend});
  }

  onToken(token) {
    const expiresMs = moment(token.expires_at).diff(moment());
    const renewTimeout = expiresMs - renewTokenMsBefore;

    setTimeout(() => {
      this.renew();
    }, renewTimeout);

    this.token = token;
  }

  renew() {
    return this.empireService.renewToken().then(token => {
      this.onToken(token);
    });
  }

  signOut(destroyToken = true) {
    this.token = undefined;
    this.browserHistory.push('/sign-in');

    return new Promise((resolve, reject) => {
      if(destroyToken) {
        this.empireService.deleteToken().then(resolve, reject);
      } else {
        resolve();
      }
    });
  }
}
