
  describe('tooltip tests', function () {

    it('Should have MaterialTooltip globally available', function () {
      expect(MaterialTooltip).to.be.a('function');
    });

    it('Should be upgraded to a MaterialTooltip successfully', function () {
      var parent = document.createElement('div'),
        el;

      parent.innerHTML = '<div id="target"></div><div id="tooltip" for="target"></div>';
      document.body.appendChild(parent);
      el = parent.querySelector('#tooltip')
      componentHandler.upgradeElement(el, 'MaterialTooltip');
      var upgraded = el.getAttribute('data-upgraded');
      expect(upgraded).to.contain('MaterialTooltip');
    });
  });
