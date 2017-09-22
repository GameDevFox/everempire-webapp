import Events from '../common/events';

export default function ClientSocket(ws) {
  const sendToSocket = msg => {
    const msgStr = JSON.stringify(msg);
    ws.send(msgStr);
  };

  const sendToChannel = channel => {
    const onMessage = e => {
      const msgStr = e.data;
      const msg = JSON.parse(msgStr);

      channel.onMessage(msg);
    };

    const onClose = () => channel.emit(Events.CLOSE);

    ws.addEventListener(Events.MESSAGE, onMessage);
    ws.addEventListener(Events.CLOSE, onClose);
  };

  return {
    sendToSocket,
    sendToChannel
  };
}
