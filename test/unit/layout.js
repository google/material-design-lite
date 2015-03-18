
  describe('layout tests', function () {

    it('Should have MaterialLayout globally available', function () {
      expect(MaterialLayout).to.be.a('function');
    });

    it('Should be upgraded to a MaterialLayout successfully', function () {
      var el = document.createElement('div');
      el.innerHTML = '<div class="wsk-layout__header"></div>' +
      '<div class="wsk-layout__drawer"></div>' +
      '<div class="wsk-layout__content"></div>';

      var parent = document.createElement('div');
      parent.appendChild(el); // MaterialLayout.init() expects a parent

      componentHandler.upgradeElement(el, 'MaterialLayout');
      expect($(el)).to.have.data('upgraded', ',MaterialLayout');
    });
  });
