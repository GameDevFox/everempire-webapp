import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';

import Root from './app/views/root';
import SignIn from './app/views/sign-in';
import Worlds from './app/views/worlds';

import './index.scss';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Root}>
      <Route path="worlds" component={Worlds}/>
    </Route>
    <Route path="/sign-in" component={SignIn}/>
  </Router>,
  document.getElementById('root')
);
