
  describe('icon-toggle tests', function () {

    it('Should have MaterialIconToggle globally available', function () {
      expect(MaterialIconToggle).to.be.a('function');
    });

    it('Should be upgraded to a MaterialIconToggle successfully', function () {
      var el = document.createElement('div');
      el.innerHTML = '<input type="checkbox" class="wsk-icon-toggle__input">';
      componentHandler.upgradeElement(el, 'MaterialIconToggle');
      var upgraded = el.getAttribute('data-upgraded');
      expect(upgraded).to.contain('MaterialIconToggle');
    });
  });
