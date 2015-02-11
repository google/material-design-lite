
describe('spinner tests', function () {

  it('Should have MaterialSpinner globally available', function () {
    expect(MaterialSpinner).to.be.a('function');
  });

  it('Should be upgraded to a MaterialSpinner successfully', function () {
    var el = document.createElement('div');
    componentHandler.upgradeElement(el, 'MaterialSpinner');
    var upgraded = el.getAttribute('data-upgraded');
    expect(upgraded).to.contain('MaterialSpinner');
  });

  it('Should start a MaterialSpinner successfully', function () {
    var el = document.createElement('div');
    componentHandler.upgradeElement(el, 'MaterialSpinner');
    el.widget.start();
    expect(el.classList.contains('is-active')).to.be.true();
  });

  it('Should stop a MaterialSpinner successfully', function () {
    var el = document.createElement('div');
    componentHandler.upgradeElement(el, 'MaterialSpinner');
    el.widget.start();
    el.widget.stop();
    expect(el.classList.contains('is-active')).to.be.false();
  });

  it('Creates MaterialSpinner layers successfully', function () {
    var el = document.createElement('div');
    componentHandler.upgradeElement(el, 'MaterialSpinner');
    var html = el.innerHTML;
    expect(html).to.contain('wsk-spinner__layer');
    expect(html).to.contain('wsk-spinner__layer-1');
    expect(html).to.contain('wsk-spinner__layer-2');
    expect(html).to.contain('wsk-spinner__layer-3');
    expect(html).to.contain('wsk-spinner__layer-4');
    expect(html).to.contain('wsk-spinner__circle');
  });
});
