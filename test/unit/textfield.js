
  describe('textfield tests', function () {

    it('Should have MaterialTextfield globally available', function () {
      expect(MaterialTextfield).to.be.a('function');
    });

    it('Should be upgraded to a MaterialTextfield successfully', function () {
      var el = document.createElement('div');
      el.innerHTML = '<input type="text" class="wsk-checkbox__input">';
      componentHandler.upgradeElement(el, 'MaterialTextfield');
      var upgraded = el.getAttribute('data-upgraded');
      expect(upgraded).to.contain('MaterialTextfield');
    });
  });
