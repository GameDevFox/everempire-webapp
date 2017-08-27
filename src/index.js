import ReactDOM from 'react-dom';
import routerP from './app/factory/router';

// CSS
import 'bootstrap-social/bootstrap-social.css';
import './index.scss';

routerP.then(router => {
  ReactDOM.render(router, document.getElementById('root'));
});
