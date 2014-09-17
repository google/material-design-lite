var paperRadio = function() {

  var radios = document.querySelectorAll('.paper-radio__label');

  for(i = 0; i < radios.length; i++) {
    var outer = document.createElement('span');
    outer.classList.add('paper-radio__outer-circle');

    var inner = document.createElement('span');
    inner.classList.add('paper-radio__inner-circle');

    var ripple = document.createElement('span');
    ripple.classList.add('paper-radio__ripple');

    var radiobutton = radios[i].querySelector('.paper-radio__button');

    radios[i].insertBefore(outer, radiobutton);
    radios[i].appendChild(inner);
    radios[i].appendChild(ripple);

    radios[i].addEventListener('click', showEffect);
  }

  function showEffect(e) {
    var ripple = this.querySelector('.paper-radio__ripple');

    if (ripple === null) {
      return;
    }

    ripple.classList.add('is-active');

    var removeRip = function(e) {
      this.classList.remove('is-active');
    }

    ripple.addEventListener('webkitTransitionEnd', removeRip);
    ripple.addEventListener('oTransitionEnd', removeRip);
    ripple.addEventListener('transitionEnd', removeRip);
  };

};

window.addEventListener('load', paperRadio);
