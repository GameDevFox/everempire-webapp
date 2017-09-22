import Commands from '../common/commands';
import TimeSync from '../common/time-sync';

export default function GenesisService(channel) {
  let pingId;
  let localTime;
  const timeSync = new TimeSync();

  let offset;
  let pingTime;

  const auth = token => {
    console.log('Authenticating with Genesis ...');
    channel.command(Commands.AUTH, token, { request: true }).then(msg => {
      console.log(`Authenticated with Genesis with User Id: ${msg.data}`);
    });
  };

  const chat = chatMsg => {
    channel.command(Commands.CHAT, chatMsg);
  };

  const updatePlayer = vectorPath => {
    channel.command(Commands.PLAYER_UPDATE, vectorPath);
  };

  const ping = (pingId, localTime) => {
    channel.command(Commands.PING, [pingId, localTime]);
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

  channel.commands.on(Commands.PING, onPing);
  channel.commands.on(Commands.PONG, onPong);

  return {
    offset: () => offset,
    pingTime: () => pingTime,
    channel: () => channel,
    auth,
    chat,
    updatePlayer,
    ping
  };
}
