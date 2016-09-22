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

import {compare} from 'dom-compare';

export function verifyBuildDom(Component, t, expected, opts = undefined) {
  const actual = Component.buildDom(opts);
  const comparison = compare(expected, actual);
  const diffs = comparison.getDifferences();

  if (diffs.length) {
    const diffMsgs = diffs.map(({node, message}) => `\t* ${node} - ${message}`).join('\n');
    t.fail(`Improper DOM Object. Diff failed:\n${diffMsgs}\n`);
  } else {
    t.pass();
  }
}
