/* eslint-env node */

const gulp = require('gulp');
const notify = require('gulp-notify');
const sass = require('gulp-sass');
const stylelint = require('gulp-stylelint');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
const eslint = require('gulp-eslint');
const browser = require('browser-sync').create();
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const dist = './drakonia_exposed/static/dist';

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack.config');
const bundler = webpack(webpackConfig);


gulp.task('sass', () => {
  return gulp
    .src(config.sassFiles)
    .pipe(sourcemaps.init())
    .pipe(sass(config.sassOptions).on('error', function(err) {
      notify().write(err);
      this.emit('end');
    }))
    .pipe(sourcemaps.write())
    .pipe(postcss(config.postcss))
    .pipe(gulp.dest(config.sassDest))
    .pipe(browser.reload({stream: true}));
});

gulp.task('sass-lint', () => {
  return gulp
    .src(config.sassFiles)
    .pipe(stylelint({
      reporters: [{
        formatter: 'string',
        console: true
      }]
    }));
});

gulp.task('browser-sync', gulp.series('sass', () => {
  browser.init({
    files: ['dist/**/*'],
    middleware: [
      webpackDevMiddleware(bundler, {
        publicPath: webpackConfig.output.publicPath,
        stats: { colors: true }
      })
    ],
    notify: false,
    open: false,
    proxy: 'localhost:5000',
    ui: false,
  });
}));

gulp.task('css-minify', gulp.series('sass', () => {
  return gulp
    .src(config.sassDest + '/*.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest(config.sassDest));
}));

gulp.task('js-lint-nice', () => {
  return gulp.src(config.jsFiles)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('js-lint', () => {
  return gulp.src(config.jsFiles)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('watch', gulp.series(
  gulp.parallel('browser-sync', 'bundle', 'sass'),
  function() {
    gulp.watch(config.sassFiles, gulp.series('sass'));
    gulp.watch(config.jsFiles, gulp.series('js-concat'));
    gulp.watch(['drakonia_exposed/templates/**/*.html'])
      .on('change', browser.reload);
  }
));

gulp.task('dev', gulp.series(
  'js-lint-nice', 'js-concat', 'sass', 'sass-lint'
));

// @TODO `js-compress` isn't working
gulp.task('build', gulp.series(
  'js-lint', 'js-concat', 'js-compress',
  'sass', 'sass-lint', 'css-minify'
));

gulp.task('default', gulp.series('dev'));
