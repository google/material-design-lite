import MDLBaseComponent from 'mdl-base-component';
import MDLRippleMixin, {
  Class,
  Identifier,
  MAX_RIPPLES,
  getNormalizedEventCoords
} from './mixin';

export default class MDLRipple extends MDLBaseComponent {
  /**
   * Convenience helper to build required DOM.
   */
  static buildDom() {
    // Create the DOM.
    const root = document.createElement('div');
    root.classList.add(Class.ROOT);

    const background = document.createElement('div');
    background.classList.add(Class.BACKGROUND);
    root.appendChild(background);

    for (let i = 0; i < MAX_RIPPLES; i++) {
      const foreground = document.createElement('div');
      foreground.classList.add(Class.FOREGROUND);
      const foregroundCircle = document.createElement('div');
      foregroundCircle.classList.add(Class.FOREGROUND_CIRCLE);
      foreground.appendChild(foregroundCircle);
      root.appendChild(foreground);
    }
    return root;
  }

  /**
   * Bind to a root element and parent surface.
   */
  static attachTo(surface, root) {
    const elements = {
      [Identifier.SURFACE]: surface,
      [Identifier.ROOT]: root,
      [Identifier.BACKGROUND]: root.getElementsByClassName(Class.BACKGROUND)[0]
    };

    const foregrounds = root.getElementsByClassName(Class.FOREGROUND);
    const foregroundCircles = root.getElementsByClassName(Class.FOREGROUND_CIRCLE);
    for (let i = 0; i < foregrounds.length; i++) {
      elements[ref(Identifier.FOREGROUND, i)] = foregrounds[i];
      elements[ref(Identifier.FOREGROUND_CIRCLE, i)] = foregroundCircles[i];
    }

    const options = {
      bounded: surface.getAttribute('bounded') !== 'false'
    };

    if (surface.hasAttribute('max-radius')) {
      options.maxRadius = parseFloat(surface.getAttribute('max-radius'), 10);
    }

    return new MDLRipple(elements, options);
  }

  constructor(elements, options = {}) {
    super(elements[Identifier.ROOT]);

    this.elements_ = elements;

    this.initMdlRipple_();

    this.isBounded = options.bounded !== false;

    this.maxRadius = typeof options.maxRadius === 'number' ? options.maxRadius : 0;

    // TODO(mtlin): Might not be the best place for this..
    this.addEventListeners();
  }

  addEventListeners() {
    const surface = this.elements_[Identifier.SURFACE];

    surface.addEventListener('mousedown', ev => {
      const {top, left} = getNormalizedEventCoords(ev, surface);

      this.startTouchBeganAnimationAtPoint(top, left);
    });
    surface.addEventListener('mouseup', ev => {
      const {top, left} = getNormalizedEventCoords(ev, surface);

      this.startTouchEndedAnimationAtPoint(top, left);
    });
    surface.addEventListener('mouseout', () => {
      this.cancelAnimations();
    });
  }
}

MDLRippleMixin.call(MDLRipple.prototype, {
  getRootElement() {
    return this.elements_[this.get(Identifier.ROOT)];
  },

  getBoundingClientRect(id) {
    return this.elements_[id].getBoundingClientRect();
  },

  setStyles(id, styles) {
    Object.assign(this.elements_[id].style, styles);
  },

  forceLayout(id) {
    return this.elements_[id].offsetWidth;
  },

  addClass(id, cls) {
    this.elements_[id].classList.add(cls);
  },

  removeClass(id, cls) {
    this.elements_[id].classList.remove(cls);
  },

  get(...symbolPath) {
    return ref(...symbolPath);
  },

  getComputedValue(id, property) {
    return window.getComputedStyle(this.elements_[id]).getPropertyValue(property);
  },

  addEventListener(id, event, listener) {
    return this.elements_[id].addEventListener(event, listener);
  },

  removeEventListener(id, event, listener) {
    this.elements_[id].removeEventListener(event, listener);
  }
});

/**
 * Element refs are concatenated symbol paths of arbitrary length.
 * e.g.
 * get('md-ripple__foreground', 0) = `md-ripple__foreground|0`
 */
function ref(...symbolPath) {
  return symbolPath.join('|');
}
