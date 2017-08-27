import configP from './config';

import Genesis, {Events} from '../services/genesis';
import Commands from '../common/commands';
import TimeSync from '../common/time-sync';

const genesisP = Promise.all([configP]).then(([config]) => {
  const genesis = new Genesis();

  // TODO: Refactor this out and/or move into genesis
  genesis.timeSync = new TimeSync();

  genesis.on(Events.UNKNOWN, data => {
    console.log('Genesis Data:', JSON.stringify(data, null, 2));
  });

  let pingId;
  let localTime;
  genesis.on(Commands.PING, args => {
    localTime = Date.now();
    pingId = args[0];
    genesis.cmd(Commands.PING, [pingId, Date.now()]);
  });

  genesis.on(Commands.PONG, args => {
    const laterLocalTime = Date.now();
    const [receivedId, serverTime] = args;

    if(pingId !== receivedId) {
      console.warn(`Ping ids did not match, ignoring: ${pingId} ${receivedId}`);
      return;
    }

    genesis.ping = laterLocalTime - localTime;
    genesis.offset = genesis.timeSync.update(localTime, serverTime, laterLocalTime) / 1000;
  });

  genesis.connect(config.genesisUrl);

  // TODO: Don't authenticate right away
  // genesis.cmd(Commands.AUTH, {token: tokenService.token});

  return genesis;
});

export default genesisP;
