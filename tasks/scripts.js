import gulp from 'gulp';
import gulpConfig from './config';

import webpack from 'webpack';
import webpackConfig from '../webpack.config.js';
import eslint from 'gulp-eslint';

function bundle() {
  return new Promise(resolve => webpack(webpackConfig, (err, stats) => {
    /* eslint-disable no-console */
    if (err) console.log('Webpack', err);
    console.log(stats.toString({ /* stats options */ }));
    resolve();
  }));
}

function lint() {
  return gulp.src(gulpConfig.jsFiles)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}

export { bundle, lint };
