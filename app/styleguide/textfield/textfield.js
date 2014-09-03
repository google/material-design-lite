(function() {
  window.addEventListener('load', function() {
    var hasClass = function(el, cl) {
      return el.className.match(new RegExp('(\\s|^)' + cl + '(\\s|$)'))
    }
    var addClass = function(el, cl) {
      if (!hasClass(el, cl)) {
        el.className += ' ' + cl;
      }
    }
    var removeClass = function(el, cl) {
      if (hasClass(el, cl)) {
        el.className = el.className
        .replace(new RegExp('(\\s|^)' + cl + '(\\s|$)'), ' ');
      }
    }

    var inputs = document.getElementsByClassName('text-input');

    for (var i = 0; i < inputs.length; i++) {
      var input = inputs[i];

      input.addEventListener('keyup', function(e) {
        if (this.value != '') {
          addClass(this, 'dirty')
        } else {
          removeClass(this, 'dirty')
        }
      });

      if (input.hasAttribute('maxrows') && !isNaN(parseInt(input.getAttribute('maxrows')))) {
        var maxrows = parseInt(input.getAttribute('maxrows'));

        // Setup InputClone and MaxHeight.
        var maxInputHeight = document.createElement('div');
        maxInputHeight.className = 'maxHeight';
        for (var j = 0; j < maxrows; j++) {
          maxInputHeight.appendChild(document.createElement('br'));
        }

        input.parentNode.appendChild(maxInputHeight);

        var inputCloneContainer = document.createElement('div');
        inputCloneContainer.className = 'inputClone';
        var inputClone = document.createElement('span');
        inputCloneContainer.appendChild(inputClone);
        input.parentNode.appendChild(inputCloneContainer);

        input.addEventListener('keyup', function(e) {
          inputClone.innerHTML = this.value;
          var height = inputClone.getBoundingClientRect().height;
          var maxHeight = maxInputHeight.getBoundingClientRect().height;
          height = Math.min(height, maxHeight);
          this.style.height = height + 'px';
        });
      }
    }
  });
})();
