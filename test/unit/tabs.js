
  describe('tabs tests', function () {

    it('Should have MaterialTabs globally available', function () {
      expect(MaterialTabs).to.be.a('function');
    });

    it('Should be upgraded to a MaterialTabs successfully', function () {
      var el = document.createElement('div');
      el.innerHTML = '' +
      '<div class="wsk-tabs wsk-js-tabs wsk-js-ripple-effect">' +
      '  <div class="wsk-tabs__tab-bar">' +
      '  </div>' +
      '</div>';

      componentHandler.upgradeElement(el, 'MaterialTabs');
      var upgraded = el.getAttribute('data-upgraded');
      expect(upgraded).to.contain('MaterialTabs');
    });

    describe('Click on the tabs', function () {
      var el = document.createElement('div'),
        tab1, tab2, content1, content2;
      el.innerHTML = '' +
      '<div class="wsk-tabs wsk-js-tabs wsk-js-ripple-effect">' +
      '  <div class="wsk-tabs__tab-bar">' +
      '   <a href="#content1" id="tab1" class="wsk-tabs__tab">1</a>' +
      '   <a href="#content2" id="tab2" class="wsk-tabs__tab">2</a>' +
      '   <a href="#content3" id="tab3" class="wsk-tabs__tab">3</a>' +
      ' </div>' +
      ' <div class="wsk-tabs__panel" id="content1"></div>' +
      ' <div class="wsk-tabs__panel" id="content2"></div>' +
      ' <div class="wsk-tabs__panel" id="content3"></div>' +
      '</div>';
      componentHandler.upgradeElement(el, 'MaterialTabs');
      tab1 = el.querySelector('#tab1');
      tab2 = el.querySelector('#tab2');
      content1 = el.querySelector('#content1');
      content2 = el.querySelector('#content2');

      it('Should activate no tab by default', function (done) {
        window.setTimeout(function () {
          expect(el.querySelectorAll('.is-active')).to.have.length(0);
          done();
        }, 100);
      });

      it('Should activate the first tab on click', function (done) {
        var el = document.createEvent('MouseEvents');
        el.initEvent('click', true, true);
        tab1.dispatchEvent(el);

        window.setTimeout(function () {
          expect(tab1.className).to.contain('is-active');
          expect(content1.className).to.contain('is-active');
          done();
        }, 100);
      });

      it('Should activate the second tab on click', function (done) {
        var el = document.createEvent('MouseEvents');
        el.initEvent('click', true, true);
        tab2.dispatchEvent(el);

        window.setTimeout(function () {
          expect(tab1.className).to.not.contain('is-active');
          expect(content1.className).to.not.contain('is-active');
          expect(tab2.className).to.contain('is-active');
          expect(content2.className).to.contain('is-active');
          done();
        }, 100);
      });
    });
  });
