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

export const ROOT = 'mdl-ripple';
export const UPGRADED = `${ROOT}-upgraded`;

export const cssClasses = {
  // Ripple is a special case where the "root" component is really a "mixin" of sorts,
  // given that it's an 'upgrade' to an existing component. That being said it is the root
  // CSS class that all other CSS classes derive from.
  ROOT: UPGRADED,
  UNBOUNDED: `${UPGRADED}--unbounded`,
  BG_ACTIVE: `${UPGRADED}--background-active`,
  BG_BOUNDED_ACTIVE_FILL: `${UPGRADED}--background-bounded-active-fill`,
  FG_BOUNDED_ACTIVE_FILL: `${UPGRADED}--foreground-bounded-active-fill`,
  FG_UNBOUNDED_ACTIVATION: `${UPGRADED}--foreground-unbounded-activation`,
  FG_UNBOUNDED_DEACTIVATION: `${UPGRADED}--foreground-unbounded-deactivation`
};

export const strings = {
  VAR_SURFACE_WIDTH: `--${ROOT}-surface-width`,
  VAR_SURFACE_HEIGHT: `--${ROOT}-surface-height`,
  VAR_FG_SIZE: `--${ROOT}-fg-size`,
  VAR_FG_UNBOUNDED_OPACITY_DURATION: `--${ROOT}-fg-unbounded-opacity-duration`,
  VAR_FG_UNBOUNDED_TRANSFORM_DURATION: `--${ROOT}-fg-unbounded-transform-duration`,
  VAR_LEFT: `--${ROOT}-left`,
  VAR_TOP: `--${ROOT}-top`,
  VAR_XF_ORIGIN_X: `--${ROOT}-xfo-x`,
  VAR_XF_ORIGIN_Y: `--${ROOT}-xfo-y`,
  VAR_FG_APPROX_XF: `--${ROOT}-fg-approx-xf`,
  ANIMATION_END_EVENT: (() => {
    const d = document.createElement('div');
    return 'webkitAnimation' in d.style ? 'webkitAnimationEnd' : 'animationend';
  })(),
  TRANSITION_END_EVENT: (() => {
    const d = document.createElement('div');
    return 'webkitTransition' in d.style ? 'webkitTransitionEnd' : 'transitionend';
  })()
};

export const numbers = {
  FG_TRANSFORM_DELAY_MS: 80,
  OPACITY_DURATION_DIVISOR: 3,
  ACTIVE_OPACITY_DURATION_MS: 110,
  MIN_OPACITY_DURATION_MS: 200,
  UNBOUNDED_TRANSFORM_DURATION_MS: 200
};
