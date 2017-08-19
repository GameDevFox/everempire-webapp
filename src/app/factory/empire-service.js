import EmpireService from '../services/empire-service';

import $ from 'jquery';
import configP from './config';

const empireService = new EmpireService($, configP);
export default empireService;
