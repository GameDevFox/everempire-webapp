import $ from 'jquery';
import 'j-toker';

const authP = $.auth.configure({
  apiUrl: 'http://localhost:3000'
});

export {$, authP};
