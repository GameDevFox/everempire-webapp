import {browserHistory} from 'react-router';

import authP from './my-query';
import bind from '../utils/class-bind';
import EmpireService from '../services/empire-service';

import RootB from '../views/root.js';
import SignInB from '../views/sign-in';
import WorldsB from '../views/worlds';

import LogoutWidgetB from '../views/widgets/logout-widget';
import TableList from '../views/widgets/table-list';

const empireService = new EmpireService(authP);

// Root
const LogoutWidget = bind(LogoutWidgetB, {authP, browserHistory});
const Root = bind(RootB, {authP, LogoutWidget});

// SignIn
const SignIn = bind(SignInB, {authP, browserHistory});

// Worlds
const Worlds = bind(WorldsB, {empireService, TableList});

export {Root, SignIn, Worlds};

// Move this to unit test
// const LogoutWidgetB = bind(LogoutWidget, {ClassA: 'A', ClassB: 'B'});
// const LogoutWidgetC = bind(LogoutWidgetB, {ClassB: 2, ClassC: 3});
