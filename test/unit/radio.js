
  describe('radio tests', function () {

    it('Should have MaterialRadio globally available', function () {
      expect(MaterialRadio).to.be.a('function');
    });

    it('Should be upgraded to a MaterialRadio successfully', function () {
      var el = document.createElement('div');
      el.innerHTML = '<input type="radio" class="wsk-radio__button">';
      componentHandler.upgradeElement(el, 'MaterialRadio');
      expect($(el)).to.have.data('upgraded', ',MaterialRadio');
    });
  });
