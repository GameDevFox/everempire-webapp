import React from 'react';
import {browserHistory, IndexRoute, Router, Route} from 'react-router';

import {authP} from './my-query';
import configP from './config';

import {Root, SignIn, Home, Game, Worlds} from './views';

configP.then(config => {
  console.log('Config:', config);
});

authP.then($ => {
  if($.auth.user.signedIn)
    console.log(`User signed in as ${$.auth.user.email}`);
  else
    console.log('Not signed in ...');
});

const enterHook = function(nextState, replace, callback) {
  authP.then($ => {
    if(nextState.location.pathname !== '/sign-in' && !$.auth.user.signedIn)
      replace('/sign-in');
    if(nextState.location.pathname === '/sign-in' && $.auth.user.signedIn)
      replace('/');

    callback();
  });
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
