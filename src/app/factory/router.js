import React from 'react';
import { browserHistory, IndexRoute, Router, Route } from 'react-router';

import { tokenServiceP } from './services';
import viewP from './views';

const routerP = Promise.all([tokenServiceP, viewP]).then(([tokenService, views]) => {
  const enterHook = function(nextState, replace, callback) {
    if(nextState.location.pathname !== '/sign-in' && !tokenService.token)
      replace('/sign-in');
    if(nextState.location.pathname === '/sign-in' && tokenService.token)
      replace('/');

    callback();
  };

  const [Root, SignIn, Home, Game, Worlds] = views;
  const router = (
    <Router history={browserHistory}>
      <Route exact path="/" component={Root} onEnter={enterHook}>
        <IndexRoute component={Home}/>
        <Route path="game" component={Game}/>
        <Route path="worlds" component={Worlds}/>
      </Route>
      <Route path="/sign-in" component={SignIn} onEnter={enterHook}/>
    </Router>
  );

  return router;
});

export default routerP;
