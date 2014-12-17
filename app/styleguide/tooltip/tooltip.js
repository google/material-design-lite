'use strict';

window.addEventListener('load', function() {

  var tooltips = document.querySelectorAll('.wsk-tooltip');

  function initializeCheckboxes(els) {
    if (!!els) {
      Array.prototype.forEach.call(els, function(el, i) {
        var forElId = el.getAttribute('for');
        var forEl = document.querySelector('#' + forElId);
        forEl.addEventListener('mouseenter', function(e) {
          e.stopPropagation();
          var props = this.getBoundingClientRect();
          el.style.left = props.left + (props.width / 2) + 'px';
          el.style.marginLeft = -1 * (el.offsetWidth / 2) + 'px';
          el.style.top = props.top + props.height + 10 + 'px';
          el.classList.add('is-active');
        }, false);
        forEl.addEventListener('mouseleave', function(e) {
          e.stopPropagation();
          el.classList.remove('is-active');
        });
      });
    }
  }

  initializeCheckboxes(tooltips);
});
