
  describe('slider tests', function () {

    it('Should have MaterialSlider globally available', function () {
      expect(MaterialSlider).to.be.a('function');
    });

    it('Should be upgraded to a MaterialSlider successfully', function () {
      var el = document.createElement('input');
      el.type = 'range';

      var parent = document.createElement('div');
      parent.appendChild(el);

      componentHandler.upgradeElement(el, 'MaterialSlider');
      expect($(el)).to.have.data('upgraded', ',MaterialSlider');
    });
  });
