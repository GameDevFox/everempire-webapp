import {browserHistory} from 'react-router';

import bind from '../utils/class-bind';

import * as game from '../game/game';

import configP from './config';

import {empireServiceP, tokenServiceP} from './services';
import genesisP from './genesis';

import RootB from '../views/root.js';
import SignInB from '../views/sign-in';
import HomeB from '../views/home';
import GameB from '../views/game';
import WorldsB from '../views/worlds';

import LogoutWidgetB from '../views/widgets/logout-widget';
import NavigationBarB from '../views/widgets/navigation-bar';
import TableList from '../views/widgets/table-list';

const viewP = Promise.all([configP, empireServiceP, tokenServiceP, genesisP])
  .then(([config, empireService, tokenService, genesis]) => {
    const {empireServiceUrl} = config;

    // Widgets
    const LogoutWidget = bind(LogoutWidgetB, {browserHistory, tokenService});
    const NavigationBar = bind(NavigationBarB, {empireService, LogoutWidget});

    // Top Level
    const Root = bind(RootB, {game, genesis, NavigationBar});
    const SignIn = bind(SignInB, {browserHistory, empireService, tokenService, empireServiceUrl});

    // Views
    const Home = bind(HomeB, {genesis});
    const Game = bind(GameB, {game});
    const Worlds = bind(WorldsB, {empireService, TableList});

    return [Root, SignIn, Home, Game, Worlds];
  }
);

export default viewP;
