import $ from 'jquery';

const configP = new Promise((resolve, reject) => {
  $.getJSON('/config.json')
    .then(config => resolve(config), ...args => reject(...args));
});

export default configP;
