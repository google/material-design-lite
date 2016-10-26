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

/**
 * @fileoverview Copies built assets from our build directory to each of their respective package's
 * dist/ folder.
 */

const path = require('path');
const fs = require('fs');
const cpFile = require('cp-file');
const toSlugCase = require('to-slug-case');
const {sync: globSync} = require('glob');

const PKG_RE = /(?:material\-design\-lite)|(?:mdl\.[a-zA-Z\-]+)/;

const isValidCwd = (
  path.basename(process.cwd()) === 'material-design-lite' &&
  fs.existsSync('packages') &&
  fs.existsSync('build')
);

if (!isValidCwd) {
  console.error(
    'Invalid CWD. Please ensure you are running this from the root of the repo, ' +
    'and that you have run `npm run dist`'
  );
  process.exit(0);
}

function getAssetEntry(asset) {
  const [entryName] = path.parse(asset).name.match(PKG_RE);
  const [MDL, componentName] = entryName.split('.');
  const dealingWithSubpackage = Boolean(MDL && componentName);
  if (!dealingWithSubpackage) {
    return entryName;
  }
  return [MDL, toSlugCase(componentName)].join('-');
}

function cpAsset(asset) {
  const assetPkg = path.join('packages', getAssetEntry(asset));
  if (!fs.existsSync(assetPkg)) {
    Promise.reject(new Error(`Non-existent asset package path ${assetPkg} for ${asset}`));
  }
  const destDir = path.join(assetPkg, 'dist', path.basename(asset));
  return cpFile(asset, destDir).then(() => console.log(`cp ${asset} -> ${destDir}`));
}

Promise.all(globSync('build/*.{css,js}').map(cpAsset)).catch(err => {
  console.error(`Error encountered copying assets: ${err}`);
  process.exit(1);
});
