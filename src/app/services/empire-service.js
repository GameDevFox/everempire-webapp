class EmpireService {

  constructor($, apiUrl) {
    this.$ = $;
    this.apiUrl = apiUrl;
  }

  get(url) {
    return this.$.getJSON(this.apiUrl + url);
  }

  post(url, data) {
    return this.$.post(this.apiUrl + url, data);
  }

  delete(url) {
    return this.$.ajax(this.apiUrl + url, {
      method: 'DELETE'
    });
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
