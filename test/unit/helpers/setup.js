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

import td from 'testdouble';

// Returns a foundation configured to use a mock object with the same api as a default adapter,
// as well as that adapter itself.
export function setupFoundationTest(FoundationClass) {
  const mockAdapter = td.object(FoundationClass.defaultAdapter);
  const foundation = new FoundationClass(mockAdapter);
  return {mockAdapter, foundation};
}
