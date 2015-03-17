
  describe('column-layout tests', function () {

    it('Should have MaterialColumnLayout globally available', function () {
      expect(MaterialColumnLayout).to.be.a('function');
    });

    it('Should be upgraded to a MaterialColumnLayout successfully', function () {
      var el = document.createElement('div');
      componentHandler.upgradeElement(el, 'MaterialColumnLayout');
      var upgraded = el.getAttribute('data-upgraded');
      expect(upgraded).to.contain('MaterialColumnLayout');
    });
  });
