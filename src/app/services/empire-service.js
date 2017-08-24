import moment from 'moment';

const renewTokenMsBefore = 60000;

export default class EmpireService {
  constructor($, configP, browserHistory) {
    this.$ = $;
    this.configP = configP;
    this.browserHistory = browserHistory;
  }

  auth(provider) {
    const configP = this.configP;
    return () => {
      return configP.then(config => {
        window.open(`${config.empireServiceUrl}/auth/${provider}`);
      });
    };
  }

  loadToken() {
    const token = this.token;
    if(token)
      this.onToken(token);
  }

  renewToken() {
    return this.get('/me/token').then(token => {
      this.onToken(token);
    });
  }

  onToken(token) {
    const expiresMs = moment(token.expires_at).diff(moment());
    const renewTimeout = expiresMs - renewTokenMsBefore;

    setTimeout(() => {
      this.renewToken();
    }, renewTimeout);

    this.token = token;
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

  getProviders() {
    return this.get('/auth/providers');
  }

  getWorlds() {
    return this.get('/worlds');
  }

  // Authenticated service calls (require token)
  getMe() {
    return this.get('/me');
  }

  clearToken() {
    this.token = undefined;
  }

  routeToSignIn() {
    this.browserHistory.push('/sign-in');
  }

  signOut(destroyToken = true) {
    this.clearToken();
    this.routeToSignIn();

    return new Promise((resolve, reject) => {
      if(destroyToken) {
        this.del('/me/token').then(resolve, reject);
      } else {
        resolve();
      }
    });
  }

  createWorld(data) {
    return this.post('/me/world', data);
  }

  destroyWorld(id) {
    return this.del(`/me/world/${id}`);
  }

  getMyWorlds() {
    return this.get('/me/worlds');
  }

  // Helpers
  call(method, path, data) {
    return this.configP.then(config => {
      const url = config.empireServiceUrl + path;
      return new Promise((resolve, reject) => {
        this.$.ajax(url, {
          method,
          data,
          success: resolve,
          error: res => {
            // Sign-out if unauthorized (401)
            if(res.status === 401) {
              this.signOut(false);
            }

            reject(res);
          }
        });
      });
    });
  }

  get(path) {
    return this.call('get', path);
  }

  post(path, data) {
    return this.call('post', path, data);
  }

  del(path) {
    return this.call('delete', path);
  }
}
