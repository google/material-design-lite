'use strict';

document.addEventListener('DOMContentLoaded', function() {

  var tooltips = Array.prototype.slice.call(document.querySelectorAll('.tooltip'));

  function initializeCheckboxes(els) {

    if (!!els) {
      Array.prototype.forEach.call(els, function(el, i) {
        var forElId = el.getAttribute('for');
        var forEl = document.querySelector('#' + forElId);
        forEl.addEventListener('mouseenter', function(e) {
          e.stopPropagation();
          var element = document.querySelector('.tooltip[for="' + this.id + '"]');
          var props = this.getBoundingClientRect();
          element.style.left = props.left + (props.width / 2) + 'px';
          element.style.marginLeft = -1 * (element.offsetWidth / 2) + 'px';
          element.style.top = props.top + props.height + 10 + 'px';
          element.classList.add('active');
        }, false);
        forEl.addEventListener('mouseleave', function(e) {
          e.stopPropagation();
          var element = document.querySelector('.tooltip[for="' + this.id + '"]');
          element.classList.remove('active');
        });
      });
    }
  }
  initializeCheckboxes(tooltips);
});
