import {browserHistory} from 'react-router';

import {authP} from './my-query';
import bind from '../utils/class-bind';
import configP from './config';
import EmpireClient from '../services/empire-client';
import EmpireService from '../services/empire-service';

import RootB from '../views/root.js';
import SignInB from '../views/sign-in';
import WorldsB from '../views/worlds';

import LogoutWidgetB from '../views/widgets/logout-widget';
import TableList from '../views/widgets/table-list';

const empireClient = new EmpireClient();
const empireService = new EmpireService(authP);

configP.then(config => {
  console.log('Config:', config);

  empireClient.connect(config.empireWebSocketUrl);
  empireClient.cmd('set', {name: 'MyName'});
});

// Root
const LogoutWidget = bind(LogoutWidgetB, {authP, browserHistory});
const Root = bind(RootB, {authP, empireClient, LogoutWidget});

// SignIn
const SignIn = bind(SignInB, {authP, browserHistory});

// Worlds
const Worlds = bind(WorldsB, {empireService, TableList});

export {Root, SignIn, Worlds};
