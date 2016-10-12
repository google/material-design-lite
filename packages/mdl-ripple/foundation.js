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

import {MDLFoundation} from 'mdl-base';

import {cssClasses, strings, numbers} from './constants';
import {animateWithClass, getNormalizedEventCoords} from './util';

const DEACTIVATION_ACTIVATION_PAIRS = {
  mouseup: 'mousedown',
  pointerup: 'pointerdown',
  touchend: 'touchstart',
  keyup: 'keydown',
  blur: 'focus'
};

export default class MDLRippleFoundation extends MDLFoundation {
  static get cssClasses() {
    return cssClasses;
  }

  static get strings() {
    return strings;
  }

  static get numbers() {
    return numbers;
  }

  static get defaultAdapter() {
    return {
      browserSupportsCssVars: () => /* boolean - cached */ {},
      isUnbounded: () => /* boolean */ {},
      isSurfaceActive: () => /* boolean */ {},
      addClass: (/* className: string */) => {},
      removeClass: (/* className: string */) => {},
      registerInteractionHandler: (/* evtType: string, handler: EventListener */) => {},
      deregisterInteractionHandler: (/* evtType: string, handler: EventListener */) => {},
      registerResizeHandler: (/* handler: EventListener */) => {},
      deregisterResizeHandler: (/* handler: EventListener */) => {},
      updateCssVariable: (/* varName: string, value: string */) => {},
      computeBoundingRect: () => /* ClientRect */ {},
      getWindowPageOffset: () => /* {x: number, y: number} */ {}
    };
  }

  // We compute this property so that we are not querying information about the client
  // until the point in time where the foundation requests it. This prevents scenarios where
  // client-side feature-detection may happen too early, such as when components are rendered on the server
  // and then initialized at mount time on the client.
  get isSupported_() {
    return this.adapter_.browserSupportsCssVars();
  }

  constructor(adapter) {
    super(Object.assign(MDLRippleFoundation.defaultAdapter, adapter));
    this.layoutFrame_ = 0;
    this.frame_ = {width: 0, height: 0};
    this.activationState_ = this.defaultActivationState_();
    this.xfDuration_ = 0;
    this.maxRadius = 0;
    this.listenerInfos_ = [
      {activate: 'touchstart', deactivate: 'touchend'},
      {activate: 'pointerdown', deactivate: 'pointerup'},
      {activate: 'mousedown', deactivate: 'mouseup'},
      {activate: 'keydown', deactivate: 'keyup'},
      {focus: 'focus', blur: 'blur'}
    ];
    this.listeners_ = {
      activate: e => this.activate_(e),
      deactivate: e => this.deactivate_(e),
      focus: () => requestAnimationFrame(
        () => this.adapter_.addClass(MDLRippleFoundation.cssClasses.BG_ACTIVE)
      ),
      blur: () => requestAnimationFrame(
        () => this.adapter_.removeClass(MDLRippleFoundation.cssClasses.BG_ACTIVE)
      )
    };
    this.unboundedOpacityFadeTimer_ = 0;
    this.resizeHandler_ = () => this.layout();
    this.cancelBgBounded_ = () => {};
    this.cancelFgBounded_ = () => {};
    this.cancelFgUnbounded_ = () => {};
  }

  defaultActivationState_() {
    return {
      isActivated: false,
      wasActivatedByPointer: false,
      wasElementMadeActive: false,
      activationStartTime: 0,
      activationEvent: null
    };
  }

  init() {
    if (!this.isSupported_) {
      return;
    }
    this.addEventListeners_();

    const {ROOT, UNBOUNDED} = MDLRippleFoundation.cssClasses;
    requestAnimationFrame(() => {
      this.adapter_.addClass(ROOT);
      if (this.adapter_.isUnbounded()) {
        this.adapter_.addClass(UNBOUNDED);
      }
      this.layoutInternal_();
    });
  }

  addEventListeners_() {
    this.listenerInfos_.forEach(info => {
      Object.keys(info).forEach(k => {
        this.adapter_.registerInteractionHandler(info[k], this.listeners_[k]);
      });
    });
    this.adapter_.registerResizeHandler(this.resizeHandler_);
  }

  activate_(e) {
    const {activationState_: activationState} = this;
    if (activationState.isActivated) {
      return;
    }

    activationState.isActivated = true;
    activationState.activationEvent = e;
    activationState.wasActivatedByPointer = (
      e.type === 'mousedown' || e.type === 'touchstart' || e.type === 'pointerdown'
    );

    activationState.activationStartTime = Date.now();
    requestAnimationFrame(() => {
      // This needs to be wrapped in an rAF call b/c web browsers
      // report active states inconsistently when they're called within
      // event handling code:
      // - https://bugs.chromium.org/p/chromium/issues/detail?id=635971
      // - https://bugzilla.mozilla.org/show_bug.cgi?id=1293741
      activationState.wasElementMadeActive = e.type === 'keydown' ? this.adapter_.isSurfaceActive() : true;
      if (activationState.wasElementMadeActive) {
        this.animateActivation_();
      } else {
        // Reset activation state immediately if element was not made active.
        this.activationState_ = this.defaultActivationState_();
      }
    });
  }

  animateActivation_() {
    const {
      BG_ACTIVE, BG_BOUNDED_ACTIVE_FILL,
      FG_UNBOUNDED_DEACTIVATION, FG_BOUNDED_ACTIVE_FILL
    } = MDLRippleFoundation.cssClasses;

    // If ripple is currently deactivating, cancel those animations.
    [
      BG_BOUNDED_ACTIVE_FILL,
      FG_UNBOUNDED_DEACTIVATION,
      FG_BOUNDED_ACTIVE_FILL
    ].forEach(c => this.adapter_.removeClass(c));
    this.cancelBgBounded_();
    this.cancelFgBounded_();
    this.cancelFgUnbounded_();
    if (this.unboundedOpacityFadeTimer_) {
      clearTimeout(this.unboundedOpacityFadeTimer_);
      this.unboundedOpacityFadeTimer_ = 0;
    }

    this.adapter_.addClass(BG_ACTIVE);
    if (this.adapter_.isUnbounded()) {
      this.animateUnboundedActivation_();
    }
  }

  animateUnboundedActivation_() {
    const {FG_UNBOUNDED_ACTIVATION} = MDLRippleFoundation.cssClasses;
    let startPoint;
    if (this.activationState_.wasActivatedByPointer) {
      startPoint = getNormalizedEventCoords(
        this.activationState_.activationEvent, this.adapter_.getWindowPageOffset(),
        this.adapter_.computeBoundingRect()
      );
    } else {
      startPoint = {
        left: this.frame_.width / 2,
        top: this.frame_.height / 2
      };
    }
    const {left, top} = startPoint;
    const {VAR_XF_ORIGIN_X, VAR_XF_ORIGIN_Y} = MDLRippleFoundation.strings;
    this.adapter_.updateCssVariable(VAR_XF_ORIGIN_X, `${left}px`);
    this.adapter_.updateCssVariable(VAR_XF_ORIGIN_Y, `${top}px`);
    this.adapter_.addClass(FG_UNBOUNDED_ACTIVATION);
  }

  deactivate_(e) {
    const {activationState_: activationState} = this;
    // This can happen in scenarios such as when you have a keyup event that blurs the element.
    if (!activationState.isActivated) {
      return;
    }
    const actualActivationType = DEACTIVATION_ACTIVATION_PAIRS[e.type];
    const expectedActivationType = activationState.activationEvent.type;
    // NOTE: Pointer events are tricky - https://patrickhlauke.github.io/touch/tests/results/
    // Essentially, what we need to do here is decouple the deactivation UX from the actual
    // deactivation state itself. This way, touch/pointer events in sequence do not trample one
    // another.
    const needsDeactivationUX = actualActivationType === expectedActivationType;
    let needsActualDeactivation = needsDeactivationUX;
    if (activationState.wasActivatedByPointer) {
      needsActualDeactivation = e.type === 'mouseup';
    }

    const state = Object.assign({}, this.activationState_);
    if (needsDeactivationUX) {
      requestAnimationFrame(() => this.animateDeactivation_(e, state));
    }
    if (needsActualDeactivation) {
      this.activationState_ = this.defaultActivationState_();
    }
  }

  animateDeactivation_(e, {wasActivatedByPointer, wasElementMadeActive, activationStartTime}) {
    const {BG_ACTIVE} = MDLRippleFoundation.cssClasses;
    if (wasActivatedByPointer || wasElementMadeActive) {
      this.adapter_.removeClass(BG_ACTIVE);
      const isPointerEvent = (
        e.type === 'touchend' || e.type === 'pointerup' || e.type === 'mouseup'
      );
      if (this.adapter_.isUnbounded()) {
        this.animateUnboundedDeactivation_(this.getUnboundedDeactivationInfo_(activationStartTime));
      } else {
        this.animateBoundedDeactivation_(e, isPointerEvent);
      }
    }
  }

  animateUnboundedDeactivation_({opacityDuration, transformDuration, approxCurScale}) {
    const {
      FG_UNBOUNDED_ACTIVATION,
      FG_UNBOUNDED_DEACTIVATION
    } = MDLRippleFoundation.cssClasses;
    const {
      VAR_FG_UNBOUNDED_OPACITY_DURATION,
      VAR_FG_UNBOUNDED_TRANSFORM_DURATION,
      VAR_FG_APPROX_XF
    } = MDLRippleFoundation.strings;
    this.adapter_.updateCssVariable(VAR_FG_APPROX_XF, `scale(${approxCurScale})`);
    this.adapter_.updateCssVariable(VAR_FG_UNBOUNDED_OPACITY_DURATION, `${opacityDuration}ms`);
    this.adapter_.updateCssVariable(VAR_FG_UNBOUNDED_TRANSFORM_DURATION, `${transformDuration}ms`);
    this.adapter_.addClass(FG_UNBOUNDED_DEACTIVATION);
    this.adapter_.removeClass(FG_UNBOUNDED_ACTIVATION);
    // We use setTimeout here since we know how long the fade will take.
    this.unboundedOpacityFadeTimer_ = setTimeout(() => {
      this.adapter_.removeClass(FG_UNBOUNDED_DEACTIVATION);
    }, opacityDuration);
  }

  getUnboundedDeactivationInfo_(activationStartTime) {
    const msElapsed = Date.now() - activationStartTime;
    const {
      FG_TRANSFORM_DELAY_MS, OPACITY_DURATION_DIVISOR,
      ACTIVE_OPACITY_DURATION_MS, UNBOUNDED_TRANSFORM_DURATION_MS,
      MIN_OPACITY_DURATION_MS
    } = MDLRippleFoundation.numbers;

    let approxCurScale = 0;
    if (msElapsed > FG_TRANSFORM_DELAY_MS) {
      approxCurScale = Math.min((msElapsed - FG_TRANSFORM_DELAY_MS) / this.xfDuration_, 1);
    }

    const transformDuration = UNBOUNDED_TRANSFORM_DURATION_MS;
    const approxOpacity = Math.min(msElapsed / ACTIVE_OPACITY_DURATION_MS, 1);
    const opacityDuration = Math.max(
      MIN_OPACITY_DURATION_MS, 1000 * approxOpacity / OPACITY_DURATION_DIVISOR
    );

    return {transformDuration, opacityDuration, approxCurScale};
  }

  animateBoundedDeactivation_(e, isPointerEvent) {
    let startPoint;
    if (isPointerEvent) {
      startPoint = getNormalizedEventCoords(
        e, this.adapter_.getWindowPageOffset(), this.adapter_.computeBoundingRect()
      );
    } else {
      startPoint = {
        left: this.frame_.width / 2,
        top: this.frame_.height / 2
      };
    }
    const {left, top} = startPoint;
    const {VAR_LEFT, VAR_TOP, TRANSITION_END_EVENT, ANIMATION_END_EVENT} = MDLRippleFoundation.strings;
    const {BG_BOUNDED_ACTIVE_FILL, FG_BOUNDED_ACTIVE_FILL} = MDLRippleFoundation.cssClasses;
    this.adapter_.updateCssVariable(VAR_LEFT, `${left}px`);
    this.adapter_.updateCssVariable(VAR_TOP, `${top}px`);
    this.cancelBgBounded_ = animateWithClass(this.adapter_, BG_BOUNDED_ACTIVE_FILL, TRANSITION_END_EVENT);
    this.cancelFgBounded_ = animateWithClass(this.adapter_, FG_BOUNDED_ACTIVE_FILL, ANIMATION_END_EVENT);
  }

  destroy() {
    if (!this.isSupported_) {
      return;
    }
    this.removeEventListeners_();

    const {ROOT, UNBOUNDED} = MDLRippleFoundation.cssClasses;
    requestAnimationFrame(() => {
      this.adapter_.removeClass(ROOT);
      this.adapter_.removeClass(UNBOUNDED);
      this.removeCssVars_();
    });
  }

  removeEventListeners_() {
    this.listenerInfos_.forEach(info => {
      Object.keys(info).forEach(k => {
        this.adapter_.deregisterInteractionHandler(info[k], this.listeners_[k]);
      });
    });
    this.adapter_.deregisterResizeHandler(this.resizeHandler_);
  }

  removeCssVars_() {
    const {strings} = MDLRippleFoundation;
    Object.keys(strings).forEach(k => {
      if (k.indexOf('VAR_') === 0) {
        this.adapter_.updateCssVariable(strings[k], null);
      }
    });
  }

  layout() {
    if (this.layoutFrame_) {
      cancelAnimationFrame(this.layoutFrame_);
    }
    this.layoutFrame_ = requestAnimationFrame(() => {
      this.layoutInternal_();
      this.layoutFrame_ = 0;
    });
  }

  layoutInternal_() {
    this.frame_ = this.adapter_.computeBoundingRect();

    const maxDim = Math.max(this.frame_.height, this.frame_.width);

    // Sqrt(2) * square length == diameter
    this.maxRadius_ = Math.sqrt(2) * maxDim / 2;
    this.xfDuration_ = 1000 * Math.sqrt(this.maxRadius_ / 1024);
    this.updateLayoutCssVars_();
  }

  updateLayoutCssVars_() {
    const fgSize = this.maxRadius_ * 2;
    const {
      VAR_SURFACE_WIDTH, VAR_SURFACE_HEIGHT, VAR_FG_SIZE,
      VAR_FG_UNBOUNDED_TRANSFORM_DURATION, VAR_LEFT, VAR_TOP
    } = MDLRippleFoundation.strings;

    this.adapter_.updateCssVariable(VAR_SURFACE_WIDTH, `${this.frame_.width}px`);
    this.adapter_.updateCssVariable(VAR_SURFACE_HEIGHT, `${this.frame_.height}px`);
    this.adapter_.updateCssVariable(VAR_FG_SIZE, `${fgSize}px`);
    this.adapter_.updateCssVariable(VAR_FG_UNBOUNDED_TRANSFORM_DURATION, `${this.xfDuration_}ms`);

    if (this.adapter_.isUnbounded()) {
      const left = -(fgSize / 2) + (this.frame_.width / 2);
      const top = -(fgSize / 2) + (this.frame_.height / 2);
      this.adapter_.updateCssVariable(VAR_LEFT, `${left}px`);
      this.adapter_.updateCssVariable(VAR_TOP, `${top}px`);
    }
  }
}
