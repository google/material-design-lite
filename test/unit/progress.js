
describe('progress tests', function () {

  it('Should have MaterialProgress globally available', function () {
    expect(MaterialProgress).to.be.a('function');
  });

  it('Should be upgraded to a MaterialProgress successfully', function () {
    var el = document.createElement('div');
    componentHandler.upgradeElement(el, 'MaterialProgress');
    expect($(el)).to.have.data('upgraded', ',MaterialProgress');
  });

  it('Should have a setProgress method', function () {
    var el = document.createElement('div');
    componentHandler.upgradeElement(el, 'MaterialProgress');
    expect(el.widget.setProgress).to.be.a('function');
  });

  it('Should have a setBuffer method', function () {
    var el = document.createElement('div');
    componentHandler.upgradeElement(el, 'MaterialProgress');
    expect(el.widget.setBuffer).to.be.a('function');
  });
});
