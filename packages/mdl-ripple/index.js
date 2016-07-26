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

import MDLBaseComponent, {
  MDLBaseAdapter, ref
} from 'mdl-base-component';
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

MDLRippleMixin.call(MDLRipple.prototype, MDLBaseAdapter);
