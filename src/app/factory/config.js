import $ from 'jquery';

const configP = new Promise((resolve, reject) => {
  $.getJSON('/config.json')
    .then(config => resolve(config), ...args => reject(...args));
});

configP.then(config => {
  console.log('Config:', config);
});

export default configP;
