import React from 'react';
import {browserHistory, IndexRoute, Router, Route} from 'react-router';

import configP from './config';
import {tokenService} from './services';
import {Root, SignIn, Home, Game, Worlds} from './views';

configP.then(config => {
  console.log('Config:', config);
});

const enterHook = function(nextState, replace, callback) {
  if(nextState.location.pathname !== '/sign-in' && !tokenService.token)
    replace('/sign-in');
  if(nextState.location.pathname === '/sign-in' && tokenService.token)
    replace('/');

  callback();
};

// router
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

export default router;
