
  describe('column-layout tests', function () {

    it('Should have MaterialColumnLayout globally available', function () {
      expect(MaterialColumnLayout).to.be.a('function');
    });

    it('Should be upgraded to a MaterialColumnLayout successfully', function () {
      var el = document.createElement('div');
      componentHandler.upgradeElement(el, 'MaterialColumnLayout');
      expect($(el)).to.have.data('upgraded', ',MaterialColumnLayout');
    });
  });
