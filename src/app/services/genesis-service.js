const Commands = {
  AUTH: 'auth'
};

class GenesisService {
  connect(url) {
    console.log(`Connecting to ${url} ...`);

    const ws = new WebSocket(url);

    this.wsP = new Promise(resolve => {
      ws.addEventListener('open', () => {
        console.log('Connection open');
        resolve(ws);
      });
    });

    ws.addEventListener('message', event => {
      console.log(`Data from server: ${event.data}`);
    });

    return this.wsP;
  }

  authenticate(authHeaders) {
    return this.cmd(Commands.AUTH, authHeaders);
  }

  cmd(cmd, args) {
    return this.send({cmd, args});
  }

  send(message) {
    const json = JSON.stringify(message);
    return this.sendText(json);
  }

  sendText(text) {
    return this.wsP.then(ws => {
      ws.send(text);
    });
  }
}

export default GenesisService;
