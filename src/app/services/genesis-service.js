import Commands from '../common/commands';
import TimeSync from '../common/time-sync';

export default function GenesisService(session) {
  let pingId;
  let localTime;
  const timeSync = new TimeSync();

  let offset;
  let pingTime;

  const auth = token => {
    console.log('Authenticating with Genesis ...');
    session.command(Commands.AUTH, token, { request: true }).then(msg => {
      console.log(`Authenticated with Genesis with User Id: ${msg.data}`);
    });
  };

  const chat = chatMsg => {
    session.command(Commands.CHAT, chatMsg);
  };

  const updatePlayer = vectorPath => {
    session.command(Commands.PLAYER_UPDATE, vectorPath);
  };

  const ping = (pingId, localTime) => {
    session.command(Commands.PING, [pingId, localTime]);
  };

  const onPing = msg => {
    pingId = msg.data[0];

    localTime = Date.now();
    ping(pingId, localTime);
  };

  const onPong = msg => {
    const [pongId, serverTime] = msg.data;
    const laterLocalTime = Date.now();

    if(pingId !== pongId) {
      console.warn(`Ping ids did not match, ignoring: ${pingId} != ${pongId}`);
      return;
    }

    pingTime = laterLocalTime - localTime;
    offset = timeSync.update(localTime, serverTime, laterLocalTime) / 1000;
  };

  session.commands.on(Commands.PING, onPing);
  session.commands.on(Commands.PONG, onPong);

  return {
    offset: () => offset,
    pingTime: () => pingTime,
    session: () => session,
    auth,
    chat,
    updatePlayer,
    ping
  };
}
