import bel from 'bel';
import td from 'testdouble';
import test from 'tape';
import mdlAutoInit from '../../../packages/mdl-auto-init';

class FakeComponent {
  static attachTo(node) {
    return new this(node);
  }

  constructor(node) {
    this.node = node;
  }
}

const createFixture = () => bel`
  <div id="root">
    <p data-mdl-auto-init="FakeComponent" class="mdl-fake">Fake Element</p>
  </div>
`;

const setupTest = () => {
  mdlAutoInit.deregisterAll();
  mdlAutoInit.register(FakeComponent.name, FakeComponent);
  return createFixture();
};

test('calls attachTo() on components registered for identifier on nodes w/ data-mdl-auto-init attr', t => {
  const root = setupTest();
  mdlAutoInit(root);

  t.true(root.querySelector('.mdl-fake').FakeComponent instanceof FakeComponent);
  t.end();
});

test('passes the node where "data-mdl-auto-init" was found to attachTo()', t => {
  const root = setupTest();
  mdlAutoInit(root);

  const fake = root.querySelector('.mdl-fake');
  t.equal(fake.FakeComponent.node, fake);
  t.end();
});

test('throws when no constructor name is specified within "data-mdl-auto-init"', t => {
  const root = setupTest();
  root.querySelector('.mdl-fake').dataset.mdlAutoInit = '';

  t.throws(() => mdlAutoInit(root));
  t.end();
});

test('throws when constructor is not registered', t => {
  const root = setupTest();
  root.querySelector('.mdl-fake').dataset.mdlAutoInit = 'MDLUnregisteredComponent';

  t.throws(() => mdlAutoInit(root));
  t.end();
});

test('warns when autoInit called multiple times on a node', t => {
  const root = setupTest();
  const warn = td.func('warn');
  const {contains} = td.matchers;

  mdlAutoInit(root, warn);
  mdlAutoInit(root, warn);

  t.doesNotThrow(() => td.verify(warn(contains('(mdl-auto-init) Component already initialized'))));
  t.end();
});

test('#register throws when Ctor is not a function', t => {
  t.throws(() => mdlAutoInit.register('not-a-function', 'Not a function'));
  t.end();
});

test('#register warns when registered key is being overridden', t => {
  const warn = td.func('warn');
  const {contains} = td.matchers;

  mdlAutoInit.register(FakeComponent.name, () => ({overridden: true}), warn);

  t.true(() => td.verify(warn(contains('(mdl-auto-init) Overriding registration'))));
  t.end();
});
