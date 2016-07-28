import bel from 'bel';
import domEvents from 'dom-events';
import test from 'tape';
import MDLRipple from '../../../packages/mdl-ripple';
import {Class, Identifier} from '../../../packages/mdl-ripple/mixin';

test('buildDom', t => {
  const expected = `
      <div class="mdl-ripple">
        <div class="mdl-ripple__background"></div>
        <div class="mdl-ripple__foreground">
          <div class="mdl-ripple__foreground-circle"></div>
        </div>
        <div class="mdl-ripple__foreground">
          <div class="mdl-ripple__foreground-circle"></div>
        </div>
        <div class="mdl-ripple__foreground">
          <div class="mdl-ripple__foreground-circle"></div>
        </div>
        <div class="mdl-ripple__foreground">
          <div class="mdl-ripple__foreground-circle"></div>
        </div>
      </div>
      `.trim().replace(/>\s+</g, '><');

  const root = MDLRipple.buildDom();
  t.equal(root.outerHTML, expected);
  t.end();
});

test('attachTo assigns options', t => {
  const root = MDLRipple.buildDom();
  let surface = bel`
      <div></div>
  `;
  let component = MDLRipple.attachTo(surface, root);
  t.equal(component.isBounded, true);

  surface = bel`
      <div bounded="false" max-radius="30"></div>
  `;
  component = MDLRipple.attachTo(surface, root);
  t.equal(component.isBounded, false);
  t.equal(component.maxRadius, 30);

  t.end();
});

test('constructor initializes with options', t => {
  const root = MDLRipple.buildDom();
  const surface = bel`
      <div></div>
  `;
  const elements = {
    [Identifier.ROOT]: root,
    [Identifier.SURFACE]: surface
  };

  let component = new MDLRipple(elements, {});
  t.equal(component.isBounded, true);

  component = new MDLRipple(elements, {bounded: false, maxRadius: 30});
  t.equal(component.isBounded, false);
  t.equal(component.maxRadius, 30);
  t.end();
});

test('ripple activates on click', t => {
  const root = MDLRipple.buildDom();
  const surface = bel`<div></div>`;
  document.body.appendChild(surface);
  const background = root.querySelector(`.${Class.BACKGROUND}`);
  const firstForeground = root.querySelector(`.${Class.FOREGROUND}`);

  MDLRipple.attachTo(surface, root);

  domEvents.emit(surface, 'mousedown');
  t.true(background.classList.contains(Class.BACKGROUND_ACTIVE));

  domEvents.emit(surface, 'mouseup');
  t.false(background.classList.contains(Class.BACKGROUND_ACTIVE));
  t.true(firstForeground.classList.contains(Class.FOREGROUND_BOUNDED_ACTIVE));

  document.body.removeChild(surface);
  t.end();
});

test('ripple cancels on mouseout', t => {
  const root = MDLRipple.buildDom();
  const surface = bel`<div></div>`;
  document.body.appendChild(surface);
  const background = root.querySelector(`.${Class.BACKGROUND}`);
  const firstForeground = root.querySelector(`.${Class.FOREGROUND}`);

  MDLRipple.attachTo(surface, root);

  domEvents.emit(surface, 'mousedown');
  t.true(background.classList.contains(Class.BACKGROUND_ACTIVE));

  domEvents.emit(surface, 'mouseout');
  t.false(background.classList.contains(Class.BACKGROUND_ACTIVE));
  t.false(firstForeground.classList.contains(Class.FOREGROUND_BOUNDED_ACTIVE));

  document.body.removeChild(surface);
  t.end();
});
