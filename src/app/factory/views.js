import {browserHistory} from 'react-router';

import authP from './my-query';
import EmpireService from '../services/empire-service';
import bind from '../utils/class-bind';

import LogoutWidgetB from '../views/logout-widget';
import RootB from '../views/root.js';
import SignInB from '../views/sign-in';
import WorldsB from '../views/worlds';

const empireService = new EmpireService(authP);

// Root
const LogoutWidget = bind(LogoutWidgetB, {authP, browserHistory});
const Root = bind(RootB, {LogoutWidget});

// SignIn
const SignIn = bind(SignInB, {authP, browserHistory});

// Worlds
const Worlds = bind(WorldsB, {empireService});

export {Root, SignIn, Worlds};

// Move this to unit test
// const LogoutWidgetB = bind(LogoutWidget, {ClassA: 'A', ClassB: 'B'});
// const LogoutWidgetC = bind(LogoutWidgetB, {ClassB: 2, ClassC: 3});
