import {SequentialAnimation} from './animation';


/** @typedef {string} */
var ElementRef;


/**
 * @enum {string}
 */
export const Class = {
  ROOT: 'md-ripple',
  FOREGROUND: 'md-ripple__foreground',
  FOREGROUND_CIRCLE: 'md-ripple__foreground-circle',
  BACKGROUND: 'md-ripple__background',
  FOREGROUND_ACTIVE: 'md-ripple__foreground-active',
  FOREGROUND_CIRCLE_ACTIVE: 'md-ripple__foreground-circle-active',
  BACKGROUND_ACTIVE: 'md-ripple__background-active',
  BACKGROUND_ACTIVE_FILL: 'md-ripple__background-active-fill',
};


/**
 * @enum {ElementRef}
 */
export const Identifier = {
  ROOT: Class.ROOT,
  SURFACE: 'md-ripple__surface',
  FOREGROUND: Class.FOREGROUND,
  FOREGROUND_CIRCLE: Class.FOREGROUND_CIRCLE,
  BACKGROUND: Class.BACKGROUND
};


/** @const {string} */
const LOG_DECELERATE = 'cubic-bezier(0.157, 0.72, 0.386, 0.987)';

/** @const {number} */
const TRANSITION_DELTA = 1e-8;

/** @const {number} */
const UNBOUNDED_EXPAND_DELAY_MS = 80;

/** @const {number} */
export const MAX_RIPPLES = 4;


export class RippleComponent {
  constructor(renderer) {
    this.renderer_ = renderer;

    /** @type {boolean} */
    this.isBounded = true;

    this.boundingRect_;

    /** @private {number} */
    this.fgIndex_ = 0;

    /** @private {number} */
    this.maxRadius_;

    this.isInit_ = false;
  }


  maybeInit() {
    if (this.isInit_) {
      return;
    }

    let surface = this.renderer_.get(Identifier.SURFACE);
    let root = this.renderer_.get(Identifier.ROOT);

    this.renderer_.setStyles(root, {
      visibility: 'visible'
    });

    this.boundingRect_ = this.renderer_.getBoundingClientRect(surface);

    // Ensure that the ripple container is a square.
    let maxDim = this.maxRadius * 2;
    this.renderer_.setStyles(root, {
      height: maxDim + 'px',
      width: maxDim + 'px',
      top: -((maxDim - this.boundingRect_.height) / 2.0) + 'px',
      left: -((maxDim - this.boundingRect_.width) / 2.0) + 'px',
    });

    this.isInit_ = true;
  }


  /**
   * @param {number} top
   * @param {number} left
   */
  startTouchBeganAnimationAtPoint(top, left) {
    this.maybeInit();

    let background = this.renderer_.get(Identifier.BACKGROUND);

    this.renderer_.addClass(background, Class.BACKGROUND_ACTIVE);

    if (!this.isBounded) {
      let foreground = this.renderer_.get(Identifier.FOREGROUND, this.fgIndex_);
      let fgCircle = this.renderer_.get(Identifier.FOREGROUND_CIRCLE, this.fgIndex_);

      // Center the ripple at the touch point.
      let origin = this.computeOriginTranslate_(top, left);
      this.renderer_.setStyles(foreground, {
        transform: `translate3d(${origin.left}px, ${origin.top}px, 0)`
      });

      // Force apply transform immediately.
      this.renderer_.forceLayout(foreground);

      let duration = 1000 * Math.sqrt(this.maxRadius / 1024);

      // Expand and fade in the circle.
      this.renderer_.setStyles(fgCircle, {
        transition: `opacity 110ms linear, transform ${duration}ms linear ${UNBOUNDED_EXPAND_DELAY_MS}ms`,
        opacity: 1,
        transform: `scale(1)`
      });

      // Gravitate towards the center.
      this.renderer_.setStyles(foreground, {
        transition: `transform ${duration}ms linear ${UNBOUNDED_EXPAND_DELAY_MS}ms`,
        transform: 'translate3d(0.01px,0,0)'
      });
    }
  }


  /**
   * @return {number}
   */
  get maxRadius() {
    if (!this.maxRadius_) {
      let maxDim = Math.max(this.boundingRect_.height, this.boundingRect_.width);
      // Sqrt(2) * square length == diameter
      return Math.sqrt(2) * maxDim / 2;
    } else {
      return this.maxRadius_;
    }
  }


  /**
   * @param {number} value
   */
  set maxRadius(value) {
    this.maxRadius_ = value;
  }


  /**
   * @param {number} top
   * @param {number} left
   * @return {{top: number, left: number}}
   */
  computeOriginTranslate_(top, left) {
    return {
      top: (top - this.boundingRect_.height / 2),
      left: (left - this.boundingRect_.width / 2)
    };
  }


  /**
   * @param {number} top
   * @param {number} left
   */
  startTouchEndedAnimationAtPoint(top, left) {
    this.maybeInit();

    let background = this.renderer_.get(Identifier.BACKGROUND);
    let foreground = this.renderer_.get(Identifier.FOREGROUND, this.fgIndex_);
    let fgCircle = this.renderer_.get(Identifier.FOREGROUND_CIRCLE, this.fgIndex_);

    this.renderer_.removeClass(background, Class.BACKGROUND_ACTIVE);

    if (this.isBounded) {
      let bgAnim = new SequentialAnimation(background, this.renderer_);

      bgAnim.start(Class.BACKGROUND_ACTIVE_FILL);
      // Center the ripple at the touch point.
      let origin = this.computeOriginTranslate_(top, left);
      this.renderer_.setStyles(foreground, {
        transform: `translate3d(${origin.left}px, ${origin.top}px, 0)`
      });

      // Force apply transform immediately.
      this.renderer_.forceLayout(foreground);

      this.renderer_.addClass(foreground, Class.FOREGROUND_ACTIVE);

      // Translate 1/3 of the way to the origin.
      let finalTop = origin.top * 2/ 3;
      let finalLeft = origin.left * 2 / 3;
      this.renderer_.setStyles(foreground, {
        transform: `translate3d(${finalLeft}px, ${finalTop}px, 0)`
      });

      let anim = new SequentialAnimation(fgCircle, this.renderer_, true);
      anim.start([Class.FOREGROUND_CIRCLE_ACTIVE, 'radius-in']);
      anim.onFinish = () => {
        this.renderer_.removeClass(foreground, Class.FOREGROUND_ACTIVE);
      };
    } else {
      // 'opacity' lookup only forces style recalc, not layout.
      // https://gist.github.com/paulirish/5d52fb081b3570c81e3a
      let circleOpacity = parseFloat(this.renderer_.getComputedValue(fgCircle, 'opacity'), 10);

      // Special case: when touch end is called programmatically (without touch
      // start) for unbounded, we set an initial starting point for the ripple.
      if (circleOpacity == 0) {
        circleOpacity = 1.0;
        this.renderer_.setStyles(fgCircle, {
          opacity: circleOpacity,
          transform: 'scale(.5)'
        });
      }

      // Hack to get the current transform value for the radius, without parsing the complicated
      // computed style.
      let currentRadius = this.renderer_.getBoundingClientRect(fgCircle).height / 2;

      let remainingRadius = this.maxRadius - currentRadius;
      let radiusDuration = 1000 * Math.sqrt(remainingRadius / 4424);
      let originDuration = radiusDuration;

      let opacityDuration = 1000 * circleOpacity / 3;
      this.renderer_.setStyles(fgCircle, {
        transition: `opacity ${opacityDuration}ms linear, transform ${radiusDuration}ms ${LOG_DECELERATE}`,
        transform: `scale(${1 + TRANSITION_DELTA})`,
        opacity: '0'
      });

      this.renderer_.setStyles(foreground, {
        transition: `transform ${originDuration}ms ${LOG_DECELERATE}`,
        transform: `translate3d(0,0,0)`
      });

      // Since we know the duration already, no need to listen for transition end.
      setTimeout(() => {
        this.resetStyles_(foreground, fgCircle);
      }, opacityDuration);
    }

    this.fgIndex_ = (this.fgIndex_ + 1) % MAX_RIPPLES;
  }


  /**
   * @param {ElementRef} foreground
   * @param {ElementRef} fgCircle
   */
  resetStyles_(foreground, fgCircle) {
    this.renderer_.setStyles(foreground, {
      transition: '',
      transform: ''
    });
    this.renderer_.setStyles(fgCircle, {
      transition: '',
      transform: '',
      opacity: ''
    });
  }


  cancelAnimations() {
    let background = this.renderer_.get(Identifier.BACKGROUND);
    this.renderer_.removeClass(background, Class.BACKGROUND_ACTIVE);

    let foreground = this.renderer_.get(Identifier.FOREGROUND, this.fgIndex_);
    let fgCircle = this.renderer_.get(Identifier.FOREGROUND_CIRCLE, this.fgIndex_);
    this.resetStyles_(foreground, fgCircle);
  }


  /**
   * @param {!Event} ev
   * @param {!Element} container
   * @return {{top: number, left:number}}
   */
  static getNormalizedEventCoords(ev, container) {
    let rect = container.getBoundingClientRect();
    let documentLeft =  window.pageXOffset + rect.left;
    let documentTop =  window.pageYOffset + rect.top;

    var normalizedLeft;
    var normalizedTop;
    // Determine touch point relative to the ripple container.
    if (ev.type == 'touchstart') {
      normalizedLeft = ev.touches[0].pageX - documentLeft;
      normalizedTop = ev.touches[0].pageY - documentTop;
    } else {
      normalizedLeft = ev.pageX - documentLeft;
      normalizedTop = ev.pageY - documentTop;
    }

    return { left: normalizedLeft, top: normalizedTop };
  };
}
