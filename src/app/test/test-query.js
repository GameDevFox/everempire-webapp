import $ from 'jquery';

$.fn.toHTML = function() {
  return this.map((index, el) => el.innerHTML).toArray();
};

export default $;
