import { browserHistory } from 'react-router';

import bind from '../utils/class-bind';

import * as game from '../game/game';

import { empireServiceP, sessionServiceP, genesisServiceP } from './services';

import RootB from '../views/root.js';
import SignInB from '../views/sign-in';
import HomeB from '../views/home';
import GameB from '../views/game';
import WorldsB from '../views/worlds';

import LogoutWidgetB from '../views/widgets/logout-widget';
import NavigationBarB from '../views/widgets/navigation-bar';
import TableList from '../views/widgets/table-list';

const viewP = Promise.all([empireServiceP, sessionServiceP, genesisServiceP])
  .then(([empireService, sessionService, genesisService]) => {
    // Widgets
    const LogoutWidget = bind(LogoutWidgetB, { browserHistory, sessionService });
    const NavigationBar = bind(NavigationBarB, { empireService, LogoutWidget });

    // Top Level
    const Root = bind(RootB, { game, genesisService, NavigationBar });
    const SignIn = bind(SignInB, { browserHistory, empireService, sessionService });

    // Views
    const Home = bind(HomeB, { genesisService });
    const Game = bind(GameB, { game });
    const Worlds = bind(WorldsB, { empireService, TableList });

    return [Root, SignIn, Home, Game, Worlds];
  }
);

export default viewP;
