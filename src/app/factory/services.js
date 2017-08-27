import {browserHistory} from 'react-router';

import EmpireService from '../services/empire-service';
import TokenService from '../services/token-service';

import $ from 'jquery';
import configP from './config';

const empireService = new EmpireService($, configP);
const tokenService = new TokenService($, empireService, browserHistory);

empireService.addListener('unauthorized', () => {
  tokenService.signOut(false);
});

export {empireService, tokenService};
