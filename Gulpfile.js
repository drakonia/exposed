/* eslint-env node */

const gulp = require('gulp');
const del = require('del');
const sass = require('gulp-sass');
const stylelint = require('gulp-stylelint');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const eslint = require('gulp-eslint');
const browser = require('browser-sync').create();
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const pump = require('pump');
const dist = './drakonia_exposed/static';

const config = {
  jsDest: dist + '/js',
  jsFiles: 'assets/js/**/*.js',
  sassDest: dist + '/css',
  sassFiles: './assets/scss/**/*.scss',
  sassOptions: {
    includePaths: ['node_modules/normalize-scss/sass'],
    errLogToConsole: true,
    outputStyle: 'expanded'
  }
};

gulp.task('browser-sync', ['sass'], () => {
  browser.init({
    open: false,
    proxy: 'localhost:5000',
    ui: false
  });
});

gulp.task('sass', () => {
  return gulp
    .src(config.sassFiles)
    .pipe(sourcemaps.init())
    .pipe(sass(config.sassOptions).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(autoprefixer())
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

gulp.task('css-minify', ['sass'], () => {
  return gulp
    .src(config.sassDest + '/*.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest(config.sassDest));
});

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

gulp.task('js-concat', () => {
  return gulp.src(config.jsFiles)
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat('main.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.jsDest))
    .pipe(browser.reload({stream: true}));
});

gulp.task('js-compress', ['js-concat'], () => {
  return gulp.src(config.jsDest + '/*.js')
    .pipe(uglify())
    .pipe(gulp.dest(config.jsDest));
});

gulp.task('watch', ['browser-sync', 'js-concat', 'sass'], () => {
  gulp.watch(config.sassFiles, ['sass']);
  gulp.watch(config.jsFiles, ['js-concat']);
  gulp.watch(['drakonia_exposed/templates/**/*.html'])
    .on('change', browser.reload);
});

gulp.task('dev', [
  'js-lint-nice', 'js-concat', 'sass', 'sass-lint'
]);

// @TODO `js-compress` isn't working
gulp.task('prod', [
  'js-lint', 'js-concat', 'js-compress',
  'sass', 'sass-lint', 'css-minify'
]);

gulp.task('default', ['dev']);
