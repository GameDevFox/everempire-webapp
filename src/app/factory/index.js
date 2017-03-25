import React from 'react';
import {Router, Route} from 'react-router';

import {Root, SignIn, Worlds, browserHistory} from './views';

// router
const router = (
  <Router history={browserHistory}>
    <Route path="/" component={Root}>
      <Route path="worlds" component={Worlds}/>
    </Route>
    <Route path="/sign-in" component={SignIn}/>
  </Router>
);

export default router;
