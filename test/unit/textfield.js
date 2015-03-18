
  describe('textfield tests', function () {

    it('Should have MaterialTextfield globally available', function () {
      expect(MaterialTextfield).to.be.a('function');
    });

    it('Should be upgraded to a MaterialTextfield successfully', function () {
      var el = document.createElement('div');
      el.innerHTML = '<input type="text" class="wsk-checkbox__input">';
      componentHandler.upgradeElement(el, 'MaterialTextfield');
      expect($(el)).to.have.data('upgraded', ',MaterialTextfield');
    });
  });
