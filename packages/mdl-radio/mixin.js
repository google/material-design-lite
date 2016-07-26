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

export const Identifier = {
  ROOT: 'mdl-radio',
  NATIVE_INPUT: 'mdl-radio__input'
};

export default function MDLRadioMixin(renderer) {
  Object.assign(this, {
    initMdlRadio_() {
      this.renderer_ = bindAll(renderer, this);
    }
  });

  Object.defineProperty(this, 'checked', {
    get: function() {
      return Boolean(this.renderer_.getProperty(Identifier.NATIVE_INPUT, 'checked'));
    },

    set: function(value) {
      this.renderer_.setProperty(Identifier.NATIVE_INPUT, 'checked', value);
    }
  });

  Object.defineProperty(this, 'disabled', {
    get: function() {
      return Boolean(this.renderer_.getProperty(Identifier.NATIVE_INPUT, 'disabled'));
    },

    set: function(value) {
      this.renderer_.setProperty(Identifier.NATIVE_INPUT, 'disabled', value);
    }
  });
}

/**
 * Create a cloned object with functions bound to the given this parameter.
 */
// TODO(mtlin): Make a shared mixin package or utils equivalent.
function bindAll(obj, self) {
  const boundObj = {};
  Object.keys(obj).forEach(key => {
    boundObj[key] = obj[key].bind(self);
  });
  return boundObj;
}
