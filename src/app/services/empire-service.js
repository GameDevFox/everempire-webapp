class EmpireService {

  constructor(authP) {
    this.authP = authP;
  }

  get(url) {
    return this.authP.then($ => $.getJSON($.auth.getApiUrl() + url));
  }

  post(url, data) {
    return this.authP.then($ => $.post($.auth.getApiUrl() + url, data));
  }

  delete(url) {
    return this.authP.then($ => $.ajax($.auth.getApiUrl() + url, {
      method: 'DELETE'
    }));
  }

  getWorlds() {
    return this.get('/worlds.json');
  }

  createWorld(props) {
    return this.post('/worlds.json', props);
  }

  destroyWorld(id) {
    return this.delete(`/worlds/${id}.json`);
  }

  getMyWorlds() {
    return this.get('/me/worlds.json');
  }
}

export default EmpireService;
