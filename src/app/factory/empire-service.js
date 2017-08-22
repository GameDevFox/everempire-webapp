import {browserHistory} from 'react-router';

import EmpireService from '../services/empire-service';

import $ from 'jquery';
import configP from './config';

const empireService = new EmpireService($, configP, browserHistory);
empireService.loadToken();

export default empireService;
