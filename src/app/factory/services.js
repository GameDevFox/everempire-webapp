import {browserHistory} from 'react-router';

import EmpireService from '../services/empire-service';
import TokenService from '../services/token-service';

import $ from 'jquery';
import configP from './config';

const empireServiceP = configP.then(config => {
  return new EmpireService($, config.empireServiceUrl);
});

const tokenServiceP = empireServiceP.then(empireService => {
  return new TokenService($, empireService, browserHistory);
});

Promise.all([empireServiceP, tokenServiceP]).then(([empireService, tokenService]) => {
  empireService.addListener('unauthorized', () => {
    tokenService.signOut(false);
  });
});

export {empireServiceP, tokenServiceP};
