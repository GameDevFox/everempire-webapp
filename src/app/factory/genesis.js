import configP from './config';
import empireService from './empire-service';

import Genesis, {Events} from '../services/genesis';
import Commands from '../common/commands';
import TimeSync from '../common/time-sync';

const genesis = new Genesis();

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

configP.then(config => {
  genesis.connect(config.genesisUrl);
  genesis.cmd(Commands.AUTH, {token: empireService.token});
});

export default genesis;
