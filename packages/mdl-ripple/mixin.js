/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import SequentialAnimation from './animation';

export const Class = {
  ROOT: 'mdl-ripple',
  BACKGROUND: 'mdl-ripple__background',
  BACKGROUND_ACTIVE: 'mdl-ripple__background--active',
  BACKGROUND_BOUNDED_ACTIVE_FILL: 'mdl-ripple__background--bounded-active-fill',
  FOREGROUND: 'mdl-ripple__foreground',
  FOREGROUND_CIRCLE: 'mdl-ripple__foreground-circle',
  FOREGROUND_BOUNDED_ACTIVE: 'mdl-ripple__foreground--bounded-active',
  FOREGROUND_BOUNDED_CIRCLE_ACTIVE: 'mdl-ripple__foreground--bounded-circle-active'
};

export const Identifier = {
  ROOT: Class.ROOT,
  SURFACE: 'mdl-ripple__surface',
  FOREGROUND: Class.FOREGROUND,
  FOREGROUND_CIRCLE: Class.FOREGROUND_CIRCLE,
  BACKGROUND: Class.BACKGROUND
};

const LOG_DECELERATE = 'cubic-bezier(0.157, 0.72, 0.386, 0.987)';

const TRANSITION_DELTA = 1e-8;

const UNBOUNDED_EXPAND_DELAY_MS = 80;

export const MAX_RIPPLES = 4;

export default function MDLRippleMixin(renderer) {
  Object.assign(this, {
    initMdlRipple_() {
      this.renderer_ = bindAll(renderer, this);

      this.isBounded = true;

      this.boundingRect_ = null;

      this.fgIndex_ = 0;

      this.maxRadius_ = 0;

      this.needsLayout_ = true;
    },

    layout(force = false) {
      if (!this.needsLayout_ && !force) {
        return;
      }

      const surface = this.renderer_.get(Identifier.SURFACE);
      const root = this.renderer_.get(Identifier.ROOT);

      this.boundingRect_ = this.renderer_.getBoundingClientRect(surface);

      // Ensure that the ripple container is a square and is visible.
      const maxDim = this.maxRadius * 2;
      this.renderer_.setStyles(root, {
        height: maxDim + 'px',
        width: maxDim + 'px',
        top: -((maxDim - this.boundingRect_.height) / 2.0) + 'px',
        left: -((maxDim - this.boundingRect_.width) / 2.0) + 'px',
        visibility: 'visible'
      });

      this.needsLayout_ = false;
    },

    startTouchBeganAnimationAtPoint(top, left) {
      this.layout();

      const background = this.renderer_.get(Identifier.BACKGROUND);

      this.renderer_.addClass(background, Class.BACKGROUND_ACTIVE);

      if (!this.isBounded) {
        const foreground = this.renderer_.get(Identifier.FOREGROUND, this.fgIndex_);
        const fgCircle = this.renderer_.get(Identifier.FOREGROUND_CIRCLE, this.fgIndex_);

        // Center the ripple at the touch point.
        const origin = this.computeOriginTranslate_(top, left);
        this.renderer_.setStyles(foreground, {
          transform: `translate3d(${origin.left}px, ${origin.top}px, 0)`
        });

        // Force apply transform immediately.
        this.renderer_.forceLayout(foreground);

        const duration = 1000 * Math.sqrt(this.maxRadius / 1024);

        // Expand and fade in the circle.
        this.renderer_.setStyles(fgCircle, {
          transition: `opacity 110ms linear, transform ${duration}ms linear ${UNBOUNDED_EXPAND_DELAY_MS}ms`,
          opacity: 1,
          transform: 'scale(1)'
        });

        // Gravitate towards the center.
        this.renderer_.setStyles(foreground, {
          transition: `transform ${duration}ms linear ${UNBOUNDED_EXPAND_DELAY_MS}ms`,
          transform: 'translate3d(0.01px,0,0)'
        });
      }
    },

    computeOriginTranslate_(top, left) {
      return {
        top: (top - this.boundingRect_.height / 2),
        left: (left - this.boundingRect_.width / 2)
      };
    },

    startTouchEndedAnimationAtPoint(top, left) {
      this.layout();

      const background = this.renderer_.get(Identifier.BACKGROUND);
      const foreground = this.renderer_.get(Identifier.FOREGROUND, this.fgIndex_);
      const fgCircle = this.renderer_.get(Identifier.FOREGROUND_CIRCLE, this.fgIndex_);

      this.renderer_.removeClass(background, Class.BACKGROUND_ACTIVE);

      if (this.isBounded) {
        const bgAnim = new SequentialAnimation(background, this.renderer_);

        bgAnim.start(Class.BACKGROUND_BOUNDED_ACTIVE_FILL);
        // Center the ripple at the touch point.
        const origin = this.computeOriginTranslate_(top, left);
        this.renderer_.setStyles(foreground, {
          transform: `translate3d(${origin.left}px, ${origin.top}px, 0)`
        });

        // Force apply transform immediately.
        this.renderer_.forceLayout(foreground);

        this.renderer_.addClass(foreground, Class.FOREGROUND_BOUNDED_ACTIVE);

        // Translate 1/3 of the way to the origin.
        const finalTop = origin.top * 2 / 3;
        const finalLeft = origin.left * 2 / 3;
        this.renderer_.setStyles(foreground, {
          transform: `translate3d(${finalLeft}px, ${finalTop}px, 0)`
        });

        const anim = new SequentialAnimation(fgCircle, this.renderer_, true);
        anim.start([Class.FOREGROUND_BOUNDED_CIRCLE_ACTIVE, 'radius-in']);
        anim.onFinish = () => {
          this.renderer_.removeClass(foreground, Class.FOREGROUND_BOUNDED_ACTIVE);
        };
      } else {
        // 'opacity' lookup only forces style recalc, not layout.
        // https://gist.github.com/paulirish/5d52fb081b3570c81e3a
        let circleOpacity = parseFloat(this.renderer_.getComputedValue(fgCircle, 'opacity'), 10);

        // Special case: when touch end is called programmatically (without touch
        // start) for unbounded, we set an initial starting point for the ripple.
        if (circleOpacity === 0) {
          circleOpacity = 1.0;
          this.renderer_.setStyles(fgCircle, {
            opacity: circleOpacity,
            transform: 'scale(.5)'
          });
        }

        // Hack to get the current transform value for the radius, without parsing the complicated
        // computed style.
        const currentRadius = this.renderer_.getBoundingClientRect(fgCircle).height / 2;

        const remainingRadius = this.maxRadius - currentRadius;
        const radiusDuration = 1000 * Math.sqrt(remainingRadius / 4424);
        const originDuration = radiusDuration;

        const opacityDuration = 1000 * circleOpacity / 3;
        this.renderer_.setStyles(fgCircle, {
          transition: `opacity ${opacityDuration}ms linear, transform ${radiusDuration}ms ${LOG_DECELERATE}`,
          transform: `scale(${1 + TRANSITION_DELTA})`,
          opacity: '0'
        });

        this.renderer_.setStyles(foreground, {
          transition: `transform ${originDuration}ms ${LOG_DECELERATE}`,
          transform: 'translate3d(0,0,0)'
        });

        // Since we know the duration already, no need to listen for transition end.
        setTimeout(() => {
          this.resetStyles_(foreground, fgCircle);
        }, opacityDuration);
      }

      this.fgIndex_ = (this.fgIndex_ + 1) % MAX_RIPPLES;
    },

    resetStyles_(...eles) {
      eles.forEach(each => {
        this.renderer_.setStyles(each, {
          transition: '',
          transform: '',
          opacity: ''
        });
      });
    },

    cancelAnimations() {
      const background = this.renderer_.get(Identifier.BACKGROUND);
      this.renderer_.removeClass(background, Class.BACKGROUND_ACTIVE);

      const foreground = this.renderer_.get(Identifier.FOREGROUND, this.fgIndex_);
      const fgCircle = this.renderer_.get(Identifier.FOREGROUND_CIRCLE, this.fgIndex_);
      this.resetStyles_(foreground, fgCircle);
    }
  });

  Object.defineProperty(this, 'maxRadius', {
    get: function() {
      if (this.maxRadius_) {
        return this.maxRadius_;
      }

      const maxDim = Math.max(this.boundingRect_.height, this.boundingRect_.width);
      // Sqrt(2) * square length == diameter
      return Math.sqrt(2) * maxDim / 2;
    },

    set: function(value) {
      this.maxRadius_ = value;
    }
  });
}

export function getNormalizedEventCoords(ev, container) {
  const rect = container.getBoundingClientRect();
  const documentLeft = window.pageXOffset + rect.left;
  const documentTop = window.pageYOffset + rect.top;

  let normalizedLeft;
  let normalizedTop;
  // Determine touch point relative to the ripple container.
  if (ev.type === 'touchstart') {
    normalizedLeft = ev.touches[0].pageX - documentLeft;
    normalizedTop = ev.touches[0].pageY - documentTop;
  } else {
    normalizedLeft = ev.pageX - documentLeft;
    normalizedTop = ev.pageY - documentTop;
  }

  return {left: normalizedLeft, top: normalizedTop};
}

/**
 * Create a cloned object with functions bound to the given this parameter.
 */
function bindAll(obj, self) {
  const boundObj = {};
  Object.keys(obj).forEach(key => {
    boundObj[key] = obj[key].bind(self);
  });
  return boundObj;
}
