import EventEmitter from 'events';

export default function ClientRestService(serviceUrl, jQuery) {
  const result = new EventEmitter();

  result.serviceUrl = serviceUrl;

  result.url = path => {
    return serviceUrl + path;
  };

  result.call = (method, path, data) => {
    return new Promise((resolve, reject) => {
      const url = result.url(path);
      jQuery.ajax(url, {
        method,
        data,
        success: resolve,
        error: res => {
          if(res.status === 401)
            result.emit('unauthorized');

          reject(res);
        }
      });
    });
  };

  return result;
}
