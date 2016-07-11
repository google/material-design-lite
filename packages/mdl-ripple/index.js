import { RippleComponent, Class, Identifier, MAX_RIPPLES } from './base';


export default class MDLRipple {
  static attachTo(surface) {
   let renderer = new MDLRipple(surface);
   let component = new RippleComponent(renderer);
   component.isBounded = surface.getAttribute('bounded') != 'false';
   if (surface.hasAttribute('max-radius')) {
     component.maxRadius = parseInt(surface.getAttribute('max-radius'), 10);
   }
   surface.appendChild(renderer.getRootElement());

   surface.addEventListener('mousedown', (ev) => {
     let coords = RippleComponent.getNormalizedEventCoords(ev, surface);

     component.startTouchBeganAnimationAtPoint(coords.top, coords.left);
   });
   surface.addEventListener('mouseup', (ev) => {
     let coords = RippleComponent.getNormalizedEventCoords(ev, surface);

     component.startTouchEndedAnimationAtPoint(coords.top, coords.left);
   });
   surface.addEventListener('mouseout', () => {
     component.cancelAnimations();
   });

    return component;
  }


  /** @param {!Element} */
  constructor(surface) {
    // Create the DOM.
    let root = document.createElement('div');
    root.classList.add(Class.ROOT);

    let background = document.createElement('div');
    background.classList.add(Class.BACKGROUND);
    root.appendChild(background);

    this.elements_ = {
      [Identifier.ROOT]: root,
      [Identifier.BACKGROUND]: background,
      [Identifier.SURFACE]: surface,
    };

    for (let i = 0; i < MAX_RIPPLES; i++) {
      let foreground = document.createElement('div');
      foreground.classList.add(Class.FOREGROUND);
      let foregroundCircle = document.createElement('div');
      foregroundCircle.classList.add(Class.FOREGROUND_CIRCLE);
      foreground.appendChild(foregroundCircle);
      root.appendChild(foreground);

      this.elements_[this.get(Identifier.FOREGROUND, i)] = foreground;
      this.elements_[this.get(Identifier.FOREGROUND_CIRCLE, i)] = foregroundCircle;
    }
  }

  getRootElement() {
    return this.elements_[this.get(Identifier.ROOT)];
  }

  getBoundingClientRect(id) {
    return this.elements_[id].getBoundingClientRect();
  }

  setStyles(id, styles) {
    Object.assign(this.elements_[id].style, styles);
  }

  forceLayout(id) {
    this.elements_[id].offsetWidth;
  }

  addClass(id, cls) {
    this.elements_[id].classList.add(cls);
  }

  removeClass(id, cls) {
    this.elements_[id].classList.remove(cls);
  }

  /**
   * Element refs are concatenated symbol paths of arbitrary length.
   * e.g.
   * get('md-ripple__foreground', 0) = `md-ripple__foreground|0`
   */
  get(...symbolPath) {
    return symbolPath.join('|');
  }

  getComputedValue(id, property) {
    return window.getComputedStyle(this.elements_[id]).getPropertyValue(property);
  }

  addEventListener(id, event, listener) {
    return this.elements_[id].addEventListener(event, listener);
  }

  removeEventListener(id, event, listener) {
    this.elements_[id].removeEventListener(event, listener);
  }
}
