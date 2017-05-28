import EventEmitter from 'events';

import Commands from '../common/commands';

const Events = {
  CONNECT: 'connect',
  DATA: 'data',
  UNKNOWN: 'unknown'
};

export default class Genesis extends EventEmitter {
  constructor() {
    super();
    this.offset = 0;
  }

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

export {Events};
