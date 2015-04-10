
describe('spinner tests', function () {

  it('Should have MaterialSpinner globally available', function () {
    expect(MaterialSpinner).to.be.a('function');
  });

  it('Should be upgraded to a MaterialSpinner successfully', function () {
    var el = document.createElement('div');
    componentHandler.upgradeElement(el, 'MaterialSpinner');
    expect($(el)).to.have.data('upgraded', ',MaterialSpinner');
  });

  it('Should start a MaterialSpinner successfully', function () {
    var el = document.createElement('div');
    componentHandler.upgradeElement(el, 'MaterialSpinner');
    el.widget.start();
    expect($(el)).to.have.class('is-active');
  });

  it('Should stop a MaterialSpinner successfully', function () {
    var el = document.createElement('div');
    componentHandler.upgradeElement(el, 'MaterialSpinner');
    el.widget.start();
    el.widget.stop();
    expect($(el)).to.not.have.class('is-active');
  });

  it('Creates MaterialSpinner layers successfully', function () {
    var el = document.createElement('div');
    componentHandler.upgradeElement(el, 'MaterialSpinner');
    var html = el.innerHTML;
    expect(html).to.contain('mdl-spinner__layer');
    expect(html).to.contain('mdl-spinner__layer-1');
    expect(html).to.contain('mdl-spinner__layer-2');
    expect(html).to.contain('mdl-spinner__layer-3');
    expect(html).to.contain('mdl-spinner__layer-4');
    expect(html).to.contain('mdl-spinner__circle');
  });
});
