
  describe('menu tests', function () {

    it('Should have MaterialMenu globally available', function () {
      expect(MaterialMenu).to.be.a('function');
    });

    it('Should be upgraded to a MaterialMenu successfully', function () {
      var parent = document.createElement('div'), // parent must exist for MaterialMenu.init()
        el = document.createElement('ul');
      parent.appendChild(el)

      componentHandler.upgradeElement(el, 'MaterialMenu');
      expect($(el)).to.have.data('upgraded', ',MaterialMenu');
    });

    describe ('visibility API', function () {
      var parent = document.createElement('div'), // parent must exist for MaterialMenu.init()
        el = document.createElement('ul');
      parent.appendChild(el)
      componentHandler.upgradeElement(el, 'MaterialMenu');

      it('should start the showing animation on show()', function(done) {
        expect($(el.widget.container_)).to.not.have.class('is-visible');
        el.widget.show();
        window.setTimeout(function() {
          expect($(el.widget.container_)).to.have.class('is-visible');

          var ev = document.createEvent('HTMLEvents');
          ev.initEvent('transitionend', true, true)
          el.dispatchEvent(ev);
          done();
        }, 100);
      });

      it('should start the hiding animation on hide()', function(done) {
        expect($(el.widget.container_)).to.have.class('is-visible');
        el.widget.hide();
        window.setTimeout(function() {
          expect($(el.widget.container_)).to.not.have.class('is-visible');

          var ev = document.createEvent('HTMLEvents');
          ev.initEvent('transitionend', true, true)
          el.dispatchEvent(ev);
          done();
        }, 100);
      });

      it('should start the showing animating on toggle() when invisible', function(done) {
        expect($(el.widget.container_)).to.not.have.class('is-visible');
        el.widget.toggle();
        window.setTimeout(function() {
          expect($(el.widget.container_)).to.have.class('is-visible');

          var ev = document.createEvent('HTMLEvents');
          ev.initEvent('transitionend', true, true)
          el.dispatchEvent(ev);
          done();
        }, 100);
      });

      it('should start the hiding animating on toggle() when visible', function(done) {
        expect($(el.widget.container_)).to.have.class('is-visible');
        el.widget.toggle();
        window.setTimeout(function() {
          expect($(el.widget.container_)).to.not.have.class('is-visible');

          var ev = document.createEvent('HTMLEvents');
          ev.initEvent('transitionend', true, true)
          el.dispatchEvent(ev);
          done();
        }, 100);
      });

    });

    it('Should be made visible on button click', function (done) {
      var ctr = document.createElement('div')
      ctr.innerHTML = '<button id="clickable">Menu</button>' +
                      '<ul class="wsk-menu wsk-js-menu wsk-js-ripple-effect" for="clickable">' +
                      '  <li class="wsk-menu__item">5.0 Lollipop</li>' +
                      '  <li class="wsk-menu__item">4.4 KitKat</li>' +
                      '  <li disabled class="wsk-menu__item">4.3 Jelly Bean</li>' +
                      '  <li class="wsk-menu__item">Android History</li>' +
                      '</ul>';
      document.body.appendChild(ctr); // `for` only works in document

      var el = ctr.querySelector('ul'),
        button = ctr.querySelector('#clickable'),
        ev = document.createEvent('MouseEvents');

      componentHandler.upgradeElement(el, 'MaterialMenu');
      ev.initEvent('click', true, true);
      button.dispatchEvent(ev);
      window.setTimeout(function() {
        expect($(el.widget.container_)).to.have.class('is-visible');
        document.body.removeChild(ctr);
        done();
      }, 100);
    });
  });
