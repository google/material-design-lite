
  describe('button tests', function () {

    it('Should have MaterialButton globally available', function () {
      expect(MaterialButton).to.be.a('function');
    });

    it('Should be upgraded to a MaterialButton successfully', function () {
      var el = document.createElement('button');
      componentHandler.upgradeElement(el, 'MaterialButton');
      expect($(el)).to.have.data('upgraded', ',MaterialButton');
    });

    it('Should be upgraded to a raised MaterialButton button with ripples successfully', function () {
      var el = document.createElement('div');
      el.innerHTML = '<button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">Raised</button>';
      var btn = el.firstChild;
      componentHandler.upgradeElement(btn, 'MaterialButton');
      expect($(btn.childNodes[1])).to.have.class('mdl-button__ripple-container');
      expect($(btn.childNodes[1].firstChild)).to.have.class('mdl-ripple');
    });

    it('Should be upgraded to a MaterialButton FAB with ripples successfully', function () {
      var el = document.createElement('div');
      el.innerHTML = '<button class="mdl-button mdl-js-button mdl-button--fab mdl-button--colored mdl-js-ripple-effect">♥</button>';
      var btn = el.firstChild;
      componentHandler.upgradeElement(btn, 'MaterialButton');
      expect($(btn.childNodes[1])).to.have.class('mdl-button__ripple-container');
      expect($(btn.childNodes[1].firstChild)).to.have.class('mdl-ripple');
    });
  });
