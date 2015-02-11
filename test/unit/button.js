
  describe('button tests', function () {

    it('Should have MaterialButton globally available', function () {
      expect(MaterialButton).to.be.a('function');
    });

    it('Should be upgraded to a MaterialButton successfully', function () {
      var el = document.createElement('button');
      componentHandler.upgradeElement(el, 'MaterialButton');
      var upgraded = el.getAttribute('data-upgraded');
      expect(upgraded).to.contain('MaterialButton');
    });

    it('Should be upgraded to a raised MaterialButton button with ripples successfully', function () {
      var el = document.createElement('div');
      el.innerHTML = '<button class="wsk-button wsk-js-button wsk-button--raised wsk-js-ripple-effect">Raised</button>';
      var btn = el.firstChild;
      componentHandler.upgradeElement(btn, 'MaterialButton');
      expect(btn.childNodes[1].className).to.contain('wsk-button__ripple-container');
      expect(btn.childNodes[1].firstChild.className).to.contain('wsk-ripple');
    });

    it('Should be upgraded to a MaterialButton FAB with ripples successfully', function () {
      var el = document.createElement('div');
      el.innerHTML = '<button class="wsk-button wsk-js-button wsk-button--fab wsk-button--colored wsk-js-ripple-effect">♥</button>';
      var btn = el.firstChild;
      componentHandler.upgradeElement(btn, 'MaterialButton');
      expect(btn.childNodes[1].className).to.contain('wsk-button__ripple-container');
      expect(btn.childNodes[1].firstChild.className).to.contain('wsk-ripple');
    });
  });
