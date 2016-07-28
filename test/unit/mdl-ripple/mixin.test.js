import lolex from 'lolex';
import td from 'testdouble';
import test from 'tape';
import MDLRippleMixin, {Class, Identifier} from '../../../packages/mdl-ripple/mixin';

function createComponent() {
  const adapter = td.object([
    'addClass',
    'forceLayout',
    'get',
    'getBoundingClientRect',
    'getComputedValue',
    'removeClass',
    'setStyles'
  ]);
  const component = {};
  MDLRippleMixin.call(component, adapter);
  component.initMdlRipple_();
  td.when(adapter.get(Identifier.ROOT)).thenReturn(Identifier.ROOT);
  td.when(adapter.get(Identifier.SURFACE)).thenReturn(Identifier.SURFACE);
  td.when(adapter.get(Identifier.BACKGROUND)).thenReturn(Identifier.BACKGROUND);
  td.when(adapter.get(Identifier.FOREGROUND, 0)).thenReturn('F0');
  td.when(adapter.get(Identifier.FOREGROUND_CIRCLE, 0)).thenReturn('FC0');
  td.when(adapter.get(Identifier.FOREGROUND, 1)).thenReturn('F1');
  td.when(adapter.get(Identifier.FOREGROUND_CIRCLE, 1)).thenReturn('FC1');
  td.when(adapter.get(Identifier.FOREGROUND, 2)).thenReturn('F2');
  td.when(adapter.get(Identifier.FOREGROUND_CIRCLE, 2)).thenReturn('FC2');
  td.when(adapter.get(Identifier.FOREGROUND, 3)).thenReturn('F3');
  td.when(adapter.get(Identifier.FOREGROUND_CIRCLE, 3)).thenReturn('FC3');
  td.when(adapter.getBoundingClientRect(Identifier.SURFACE)).thenReturn({
    width: 100,
    height: 50
  });
  return {component, adapter};
}

test('layout sets initial ripple bounding box', t => {
  const {anything} = td.matchers;
  const {component, adapter} = createComponent();

  component.layout();

  // Verify ripple box.
  t.doesNotThrow(() =>
      td.verify(adapter.setStyles(Identifier.ROOT, {
        height: '141.4213562373095px',
        width: '141.4213562373095px',
        top: '-45.710678118654755px',
        left: '-20.710678118654755px',
        visibility: 'visible'
      })));

  // Layout not called if not dirty.
  component.layout();
  t.doesNotThrow(() =>
      td.verify(adapter.setStyles(Identifier.ROOT, anything()), {times: 1}));

  t.end();
});

test('startTouchBeganAnimationAtPoint begins bounded animation', t => {
  const {component, adapter} = createComponent();

  component.startTouchBeganAnimationAtPoint(0, 0);
  t.doesNotThrow(() =>
      td.verify(adapter.addClass(Identifier.BACKGROUND, Class.BACKGROUND_ACTIVE)));
  t.end();
});

test('startTouchBeganAnimationAtPoint begins unbounded animation', t => {
  const {contains} = td.matchers;
  const {component, adapter} = createComponent();
  component.isBounded = false;
  component.maxRadius = 10;

  component.startTouchBeganAnimationAtPoint(0, 0);
  t.doesNotThrow(() =>
      td.verify(adapter.addClass(Identifier.BACKGROUND, Class.BACKGROUND_ACTIVE)));

  // Circle begins expanding and fading in.
  t.doesNotThrow(() =>
      td.verify(adapter.setStyles('FC0', contains({
        opacity: 1,
        transform: 'scale(1)',
        transition: 'opacity 110ms linear, transform 98.82117688026186ms linear 80ms'
      }))));

  // Circle has correct origin.
  t.doesNotThrow(() =>
      td.verify(adapter.setStyles('F0', contains({
        transform: 'translate3d(-50px, -25px, 0)'
      }))));

  // Circle begins gravitating towards center.
  t.doesNotThrow(() =>
      td.verify(adapter.setStyles('F0', contains({
        transform: 'translate3d(0.01px,0,0)',
        transition: 'transform 98.82117688026186ms linear 80ms'
      }))));

  t.end();
});

test('startTouchEndedAnimationAtPoint begins bounded animation', t => {
  const {component, adapter} = createComponent();

  component.startTouchEndedAnimationAtPoint(0, 0);

  t.doesNotThrow(() =>
      td.verify(adapter.removeClass(Identifier.BACKGROUND, Class.BACKGROUND_ACTIVE)));
  t.doesNotThrow(() =>
      td.verify(adapter.addClass('F0', Class.FOREGROUND_BOUNDED_ACTIVE)));

  // Circle has correct origin.
  t.doesNotThrow(() =>
      td.verify(adapter.setStyles('F0', {
        transform: 'translate3d(-50px, -25px, 0)'
      })));

  // Circle gravitates part of the way.
  t.doesNotThrow(() =>
      td.verify(adapter.setStyles('F0', {
        transform: 'translate3d(-33.333333333333336px, -16.666666666666668px, 0)'
      })));

  t.end();
});

test('startTouchEndedAnimationAtPoint begins unbounded animation', t => {
  const clock = lolex.install();
  const {component, adapter} = createComponent();
  component.isBounded = false;
  component.maxRadius = 10;

  // Partially expanded
  td.when(adapter.getComputedValue('FC0', 'opacity')).thenReturn(0.2);
  td.when(adapter.getBoundingClientRect('FC0')).thenReturn({
    width: 10,
    height: 5
  });

  component.startTouchEndedAnimationAtPoint(0, 0);

  t.doesNotThrow(() =>
      td.verify(adapter.removeClass(Identifier.BACKGROUND, Class.BACKGROUND_ACTIVE)));

  // Circle changes to faster animation timings and fades out.
  t.doesNotThrow(() =>
      td.verify(adapter.setStyles('FC0', {
        opacity: '0',
        transform: 'scale(1.00000001)',
        transition: 'opacity 66.66666666666667ms linear, transform 41.1740011720207ms ' +
            'cubic-bezier(0.157, 0.72, 0.386, 0.987)'
      })));

  // Circle translates to center.
  t.doesNotThrow(() =>
      td.verify(adapter.setStyles('F0', {
        transform: 'translate3d(0,0,0)',
        transition: 'transform 41.1740011720207ms cubic-bezier(0.157, 0.72, 0.386, 0.987)'
      })));

  // Check styles only reset after animation.
  clock.tick(65);
  t.doesNotThrow(() =>
      td.verify(adapter.setStyles('FC0', {
        opacity: '',
        transform: '',
        transition: ''
      }), {times: 0}));

  // Tick past opacity finished.
  clock.tick(2);
  t.doesNotThrow(() =>
      td.verify(adapter.setStyles('FC0', {
        opacity: '',
        transform: '',
        transition: ''
      })));

  clock.uninstall();
  t.end();
});

test('maxRadius correctly computed', t => {
  const {component} = createComponent();

  // Default constructor value, layout/measurements not yet triggered.
  t.equal(0, component.maxRadius);

  component.layout();

  // Non-zero user setting.
  component.maxRadius = 30;
  t.equal(component.maxRadius, 30);

  // Computed.
  component.maxRadius = 0;
  t.equal(component.maxRadius, 70.71067811865476);
  t.end();
});

test('multiple ripples are created and cycled', t => {
  const {component, adapter} = createComponent();

  for (let i = 0; i < 8; i++) {
    component.startTouchEndedAnimationAtPoint(0, 0);
  }

  t.doesNotThrow(() =>
      td.verify(adapter.addClass('F0', Class.FOREGROUND_BOUNDED_ACTIVE), {times: 2}));
  t.doesNotThrow(() =>
      td.verify(adapter.addClass('F1', Class.FOREGROUND_BOUNDED_ACTIVE), {times: 2}));
  t.doesNotThrow(() =>
      td.verify(adapter.addClass('F2', Class.FOREGROUND_BOUNDED_ACTIVE), {times: 2}));
  t.doesNotThrow(() =>
      td.verify(adapter.addClass('F3', Class.FOREGROUND_BOUNDED_ACTIVE), {times: 2}));
  t.end();
});

test('press animation is canceled', t => {
  const {component, adapter} = createComponent();

  component.startTouchBeganAnimationAtPoint(0, 0);
  component.cancelAnimations();

  t.doesNotThrow(() =>
      td.verify(adapter.removeClass(Identifier.BACKGROUND, Class.BACKGROUND_ACTIVE)));
  t.end();
});
