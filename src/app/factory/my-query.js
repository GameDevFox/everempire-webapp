import $ from 'jquery';
import 'j-toker';

import configP from './config';

const authP = new Promise(resolve => {
  configP.then(config => {
    $.auth.configure({apiUrl: config.empireServiceUrl})
      .then(() => resolve($), () => resolve($));
  });
});

$.getAuthHeaders = function() {
  const jQuery = this;
  return authP.then(() => {
    const authHeadersCookie = jQuery.cookie('authHeaders');
    const authHeaders = authHeadersCookie ? JSON.parse(authHeadersCookie) : undefined;
    return authHeaders;
  });
};

export default $;
export {authP};
