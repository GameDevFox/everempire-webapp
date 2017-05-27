import {browserHistory} from 'react-router';

import {authP} from './my-query';
import bind from '../utils/class-bind';

import * as game from '../game/game';

import EmpireService from '../services/empire-service';

import RootB from '../views/root.js';
import SignInB from '../views/sign-in';
import HomeB from '../views/home';
import GameB from '../views/game';
import WorldsB from '../views/worlds';

import LogoutWidgetB from '../views/widgets/logout-widget';
import NavigationBarB from '../views/widgets/navigation-bar';
import TableList from '../views/widgets/table-list';

import genesis from './genesis';

const empireService = new EmpireService(authP);

// Widgets
const LogoutWidget = bind(LogoutWidgetB, {authP, browserHistory});
const NavigationBar = bind(NavigationBarB, {authP, LogoutWidget});

// Top Level
const Root = bind(RootB, {game, genesis, NavigationBar});
const SignIn = bind(SignInB, {authP, browserHistory});

// Views
const Home = bind(HomeB, {genesis});
const Game = bind(GameB, {game});
const Worlds = bind(WorldsB, {empireService, TableList});

export {Root, SignIn, Home, Game, Worlds};
