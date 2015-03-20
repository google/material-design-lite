
  describe('tooltip tests', function () {

    it('Should have MaterialTooltip globally available', function () {
      expect(MaterialTooltip).to.be.a('function');
    });

    it('Should be upgraded to a MaterialTooltip successfully', function () {
      var parent = document.createElement('div');
      parent.innerHTML = '<div id="target"></div><div id="tooltip" for="target"></div>';
      document.body.appendChild(parent);

      var el = parent.querySelector('#tooltip');
      componentHandler.upgradeElement(el, 'MaterialTooltip');
      expect($(el)).to.have.data('upgraded', ',MaterialTooltip');
    });
  });
