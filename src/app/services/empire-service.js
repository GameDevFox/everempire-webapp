import EventEmitter from 'events';

export default class EmpireService extends EventEmitter {
  constructor($, serviceUrl) {
    super();

    this.$ = $;
    this.serviceUrl = serviceUrl;
  }

  auth(provider) {
    return () => {
      const url = this.url(`/auth/${provider}`);
      window.open(url);
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
  url(path) {
    return this.serviceUrl + path;
  }

  call(method, path, data) {
    return new Promise((resolve, reject) => {
      const url = this.url(path);
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
