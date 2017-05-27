import {authP} from './my-query';
import configP from './config';

import Genesis, {Commands, Events} from '../services/genesis';

const genesis = new Genesis();

genesis.on(Events.UNKNOWN, data => {
  console.log('Genesis Data:', JSON.stringify(data, null, 2));
});

genesis.on(Events.CONNECT, () => {
  let count = 0;
  const interval = setInterval(() => {
    const clientTime = Date.now();
    genesis.cmd('sync', clientTime);

    if(++count >= 10)
      clearInterval(interval);
  }, 100);
});

const baseTime = Date.now();

let minOffset = 0;
let maxOffset = Number.POSITIVE_INFINITY;
genesis.on(Commands.SYNC, args => {
  const finalClientTime = Date.now();
  const {clientTime, serverTime} = args;

  const thisMinOffset = serverTime - finalClientTime;
  const thisMaxOffset = serverTime - clientTime;

  minOffset = Math.max(minOffset, thisMinOffset);
  maxOffset = Math.min(maxOffset, thisMaxOffset);
  const minMaxDiff = maxOffset - minOffset;
  const clientServerOffset = Math.floor(minOffset + (minMaxDiff / 2));

  console.log(`-`);
  console.log(`${clientTime - baseTime} < ${serverTime - baseTime} < ${finalClientTime - baseTime} (${finalClientTime - clientTime})`);
  console.log(`${serverTime - finalClientTime} < ${serverTime - clientTime}`);
  console.log(`${minOffset} < ${clientServerOffset} < ${maxOffset} (${maxOffset - minOffset})`);
});

Promise.all([authP, configP]).then(([$, config]) => {
  genesis.connect(config.genesisUrl);
  // TODO: AUTH command should go here
  genesis.cmd('set', {name: $.auth.user.email});
});

export default genesis;
