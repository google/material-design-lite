#!/bin/sh

##
# Copyright 2016 Google Inc. All Rights Reserved.
#
#  Licensed under the Apache License, Version 2.0 (the "License");
#  you may not use this file except in compliance with the License.
#  You may obtain a copy of the License at
#
#       http://www.apache.org/licenses/LICENSE-2.0
#
#  Unless required by applicable law or agreed to in writing, software
#  distributed under the License is distributed on an "AS IS" BASIS,
#  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#  See the License for the specific language governing permissions and
#  limitations under the License.
#

set -e

function log() {
  echo '\033[36m[pre-release]\033[0m' "$@"
}

log "Running npm test to ensure no breakages..."
npm test
echo ""

log "Building packages..."
npm run dist
echo ""

log "Moving built assets to package directories..."
node scripts/cp-pkgs.js
echo ""

log "Determining package versions..."
node scripts/determine-pkg-versions.js
echo ""

log "Pre-release steps done! You should now commit the changelog and then run " \
    "\$(npm bin)/lerna publish, followed by ./scripts/post-release.sh"
log "Please use the package versions specified above to increment the different package versions " \
    "When prompted by lerna. Or, override those versions if need be."
echo ""
