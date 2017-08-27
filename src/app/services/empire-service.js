import EventEmitter from 'events';

export default class EmpireService extends EventEmitter {
  constructor($, configP, browserHistory) {
    super();

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

  renewToken() {
    return this.get('/me/token');
  }

  deleteToken() {
    return this.del('/me/token');
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
            if(res.status === 401)
              this.emit('unauthorized');

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
