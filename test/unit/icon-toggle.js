
  describe('icon-toggle tests', function () {

    it('Should have MaterialIconToggle globally available', function () {
      expect(MaterialIconToggle).to.be.a('function');
    });

    it('Should be upgraded to a MaterialIconToggle successfully', function () {
      var el = document.createElement('div');
      el.innerHTML = '<input type="checkbox" class="mdl-icon-toggle__input">';
      componentHandler.upgradeElement(el, 'MaterialIconToggle');
      expect($(el)).to.have.data('upgraded', ',MaterialIconToggle');
    });
  });
