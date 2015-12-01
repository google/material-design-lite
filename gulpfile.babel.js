/**
 *
 *  Material Design Lite
 *  Copyright 2015 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */

'use strict';

import gulp from 'gulp';
import * as tasks from './gulp/tasks';

import browserSync from 'browser-sync';
const reload = browserSync.reload;

gulp.task('styles', gulp.parallel(
  tasks.mdlCss,
  gulp.series(tasks.mdlThemeTemplate, tasks.mdlThemes),
  tasks.mdlGrid
));

gulp.task('scripts', gulp.parallel(
  tasks.jslint,
  tasks.mdlJs
));

gulp.task('test', gulp.series(
  gulp.parallel('styles', 'scripts'),
  tasks.mocha
));

gulp.task('closure', gulp.series(tasks.mdlClosureJs, tasks.mochaClosure));

gulp.task('default', gulp.series(
  gulp.parallel('styles', 'scripts', tasks.images, tasks.metadata),
  gulp.parallel(
    tasks.mdlZip,
    tasks.mocha
  )
));

gulp.task('serve', () => {
  browserSync({
    notify: false,
    server: {
      baseDir: ['.']
    }
  });

  gulp.watch(['src/**/*.js'], gulp.series('scripts', reload));
  gulp.watch(['src/**/*.{scss,css}'], gulp.series('styles', reload));
  gulp.watch(['src/**/*.{svg,png,jpg}'], gulp.series(tasks.images, reload));
  gulp.watch(['package.json', 'bower.json', 'LICENSE'], gulp.series(tasks.metadata));
});

gulp.task('release', gulp.series(
  'default',
  tasks.prepareRelease,
  tasks.publishRelease,
  (cb) => {
    if(process.env.PUSH === 'true') {
      del('release');
    }
    cb();
  }
  ));
