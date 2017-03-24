class EmpireClient {

  static connect(url) {
    const ws = new WebSocket(url);

    ws.addEventListener('open', event => {
      console.log(event);
      console.log('I\'ve opened a connection');
      ws.send('It\'s open');
    });

    ws.addEventListener('message', event => {
      console.log(event);
      console.log(`Data from server: ${event.data}`);
    });

    return ws;
  }
}

export default EmpireClient;
