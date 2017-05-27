const EventEmitter = require('events');

const Events = {
  CONNECT: 'connect',
  DATA: 'data',
  UNKNOWN: 'unknown'
};

const Commands = {
  AUTH: 'auth',
  PLAYER_UPDATE: 'player_update',
  PING: 'ping',
  SYNC: 'sync'
};

class Genesis extends EventEmitter {
  connect(url) {
    console.log(`Connecting to GENESIS at ${url} ...`);

    const ws = new WebSocket(url);

    this.wsP = new Promise(resolve => {
      ws.addEventListener('open', () => {
        console.log('Connected to GENESIS');
        resolve(ws);
        this.emit(Events.CONNECT);
      });
    });

    ws.addEventListener('message', event => {
      const msg = event.data;

      const data = JSON.parse(msg);
      this.emit(Events.DATA, data);

      const cmd = data.cmd;
      if(cmd)
        this.emit(cmd, data.args);
      else
        this.emit(Events.UNKNOWN, data);
    });

    // Ping Handler
    this.ping = -1;
    this.on(Commands.PING, args => {
      this.ping = args;
      this.cmd('pong');
    });

    return this.wsP;
  }

  authenticate(authHeaders) {
    return this.cmd(Commands.AUTH, authHeaders);
  }

  cmd(cmd, args) {
    const msg = {cmd};
    if(args)
      msg.args = args;
    return this.send(msg);
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

export default Genesis;
export {Events, Commands};
