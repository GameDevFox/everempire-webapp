import $ from 'jquery';
import 'j-toker';

const authP = new Promise((resolve, reject) => {
  $.getJSON('/config.json')
    .then(config => {
      console.log('Config:', config);

      $.auth
        .configure({apiUrl: config.everempireApiUrl})
        .then(() => resolve($), () => resolve($));
    }, ...args => reject(...args));
});

authP.then($ => {
  if($.auth.user.signedIn)
    console.log(`User signed in as ${$.auth.user.email}`);
  else
    console.log('Not signed in ...');
});

export default authP;
