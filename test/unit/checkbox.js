
  describe('checkbox tests', function () {

    it('Should have MaterialCheckbox globally available', function () {
      expect(MaterialCheckbox).to.be.a('function');
    });

    it('Should be upgraded to a MaterialCheckbox successfully', function () {
      var el = document.createElement('div');
      el.innerHTML = '<input type="checkbox" class="mdl-checkbox__input">';
      componentHandler.upgradeElement(el, 'MaterialCheckbox');
      expect($(el)).to.have.data('upgraded', ',MaterialCheckbox');
    });
  });
