import { browserHistory } from 'react-router';

import ClientRestService from '../client/client-rest-service';
import ClientSocket from '../client/client-socket';

import EmpireService from '../common/empire-service';
import Channel from '../common/channel';

import GenesisService from '../services/genesis-service';
import TokenService from '../services/token-service';
import SessionService from '../services/session-service';

import jQuery from 'jquery';
import configP from './config';

const genesisServiceP = configP.then(config => {
  const webSocketUrl = config.genesisUrl;
  console.log(`Connecting to GENESIS at ${webSocketUrl} ...`);

  const ws = new WebSocket(webSocketUrl);
  return new Promise(resolve => {
    ws.addEventListener('open', () => {
      console.log('Connected to GENESIS');

      const { sendToSocket, sendToChannel } = new ClientSocket(ws);
      const channel = new Channel(sendToSocket);
      sendToChannel(channel);

      const genesisService = GenesisService(channel);
      resolve(genesisService);
    });
  });
});

const clientRestServiceP = configP.then(config => ClientRestService(config.empireServiceUrl, jQuery));
const empireServiceP = clientRestServiceP.then(clientRestService => EmpireService(clientRestService));
const tokenServiceP = empireServiceP.then(empireService => new TokenService(jQuery, empireService));

const sessionServiceP =
  Promise.all([empireServiceP, tokenServiceP, genesisServiceP, configP])
    .then(([empireService, tokenService, genesisService, config]) => {
      return new SessionService(browserHistory, empireService, tokenService, genesisService, config.empireServiceUrl);
    });

Promise.all([clientRestServiceP, sessionServiceP]).then(([clientRestService, sessionService]) => {
  clientRestService.on('unauthorized', () => {
    console.log('Invalid token, returning to sign in page');
    sessionService.signOut(false);
  });
});

export { empireServiceP, sessionServiceP, tokenServiceP, genesisServiceP };
