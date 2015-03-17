
  describe('tabs tests', function () {

    it('Should have MaterialTabs globally available', function () {
      expect(MaterialTabs).to.be.a('function');
    });

    it('Should be upgraded to a MaterialTabs successfully', function () {
      var el = document.createElement('div');
      el.innerHTML = '' +
      '<div class="wsk-tabs wsk-js-tabs wsk-js-ripple-effect">' +
      '  <div class="wsk-tabs__tab-bar">' +
      '   <a href="#starks-panel" class="wsk-tabs__tab is-active">Starks</a>' +
      '   <a href="#lannisters-panel" class="wsk-tabs__tab">Lannisters</a>' +
      '   <a href="#targaryens-panel" class="wsk-tabs__tab">Targaryens</a>' +
      ' </div>' +
      ' <div class="wsk-tabs__panel is-active" id="starks-panel"></div>' +
      ' <div class="wsk-tabs__panel" id="lannisters-panel"></div>' +
      ' <div class="wsk-tabs__panel" id="targaryens-panel"></div>' +
      '</div>';

      componentHandler.upgradeElement(el, 'MaterialTabs');
      var upgraded = el.getAttribute('data-upgraded');
      expect(upgraded).to.contain('MaterialTabs');
    });
  });
