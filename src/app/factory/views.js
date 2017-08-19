import {browserHistory} from 'react-router';

import bind from '../utils/class-bind';

import * as game from '../game/game';

import genesis from './genesis';
import empireService from './empire-service';

import RootB from '../views/root.js';
import SignInB from '../views/sign-in';
import HomeB from '../views/home';
import GameB from '../views/game';
import WorldsB from '../views/worlds';

import LogoutWidgetB from '../views/widgets/logout-widget';
import NavigationBarB from '../views/widgets/navigation-bar';
import TableList from '../views/widgets/table-list';

// Widgets
const LogoutWidget = bind(LogoutWidgetB, {browserHistory, empireService});
const NavigationBar = bind(NavigationBarB, {empireService, LogoutWidget});

// Top Level
export const Root = bind(RootB, {game, genesis, NavigationBar});
export const SignIn = bind(SignInB, {browserHistory, empireService});

// Views
export const Home = bind(HomeB, {genesis});
export const Game = bind(GameB, {game});
export const Worlds = bind(WorldsB, {empireService, TableList});
