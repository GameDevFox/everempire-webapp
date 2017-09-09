import EventEmitter from 'events';

import Events from '../common/events';

export default class ClientSocket extends EventEmitter {
  constructor(ws) {
    super();
    this.ws = ws;

    this.ws.addEventListener('message', e => this.onMessage(e));
    this.ws.addEventListener('close', () => this.onClose());
  }

  send(msg) {
    this.ws.send(msg);
  }

  onMessage(e) {
    const msg = e.data;
    this.emit(Events.MESSAGE, msg);
  }

  onClose() {
    this.emit(Events.CLOSE);
  }
}
