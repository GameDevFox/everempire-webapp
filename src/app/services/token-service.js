import EventEmitter from 'events';
import moment from 'moment';

const renewTokenMsBefore = 60000; // 1 Minute

export default class TokenService extends EventEmitter {
  constructor(jQuery, empireService) {
    super();

    this.jQuery = jQuery;
    this.empireService = empireService;
  }

  get token() {
    return JSON.parse(sessionStorage.getItem('token'));
  }

  set token(tokenData) {
    const renewTimeout = this.getRenewTimeout(tokenData.expires_at);
    setTimeout(() => this.renew(), renewTimeout);

    sessionStorage.setItem('token', JSON.stringify(tokenData));
    this.jQuery.ajaxSetup({
      beforeSend: xhr => {
        xhr.setRequestHeader('Token', tokenData.token);
      }
    });
  }

  clear() {
    sessionStorage.removeItem('token');
    this.jQuery.ajaxSetup({ beforeSend: undefined });
    return;
  }

  getRenewTimeout(expires) {
    const expiresMs = moment(expires).diff(moment());
    const renewTimeout = expiresMs - renewTokenMsBefore;
    return renewTimeout;
  }

  renew() {
    return this.empireService.renewToken().then(token => {
      this.token = token;
    });
  }
}
