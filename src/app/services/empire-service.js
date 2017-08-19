export default class EmpireService {
  constructor($, configP) {
    this.$ = $;
    this.configP = configP;
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
    this.token = sessionStorage.getItem('token');
  }

  get token() {
    return sessionStorage.getItem('token');
  }

  set token(token) {
    if(token)
      sessionStorage.setItem('token', token);
    else
      sessionStorage.removeItem('token');

    let beforeSend;
    if(token) {
      beforeSend = xhr => {
        xhr.setRequestHeader('Token', token);
      };
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

  signOut() {
    const clearToken = () => {
      this.token = undefined;
    };

    return this.del('/me/token')
      .then(clearToken, clearToken);
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
          error: reject
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
