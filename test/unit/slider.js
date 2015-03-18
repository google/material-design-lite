
  describe('slider tests', function () {

    it('Should have MaterialSlider globally available', function () {
      expect(MaterialSlider).to.be.a('function');
    });

    it('Should be upgraded to a MaterialSlider successfully', function () {
      var el = document.createElement('input'),
        parent = document.createElement('div');
      el.type = 'range';
      parent.appendChild(el);

      componentHandler.upgradeElement(el, 'MaterialSlider');
      expect($(el)).to.have.data('upgraded', ',MaterialSlider');
    });
  });
