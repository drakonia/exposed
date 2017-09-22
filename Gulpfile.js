/* eslint-env node */

const gulp = require('gulp');
const util = require('gulp-util');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const eslint = require('gulp-eslint');
const browserSync = require('browser-sync').create();
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');

const config = {
  env: {
    prod: !!util.env.prod
  },
  jsDest: './drakonia_exposed/static/dist/js',
  jsFiles: 'assets/js/**/*.js',
  sassDest: './drakonia_exposed/static/dist/css',
  sassFiles: './assets/scss/**/*.scss',
  sassOptions: {
    includePaths: ['node_modules/normalize-scss/sass'],
    errLogToConsole: true,
    outputStyle: 'expanded'
  }
};

gulp.task('sass', () => {
  return gulp
    .src(config.sassFiles)
    .pipe(sourcemaps.init())
    .pipe(sass(config.sassOptions).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(autoprefixer())
    .pipe(gulp.dest(config.sassDest))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('lint-js', () => {
  return gulp.src(config.jsFiles)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('scripts', () => {
  let stream = gulp.src(config.jsFiles)
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat('main.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.jsDest));
  
  if (config.env.prod) {
    stream
      .pipe(rename('main.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest(config.jsDest));
  }
    
  return stream;
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'drakonia_exposed'
    },
  });
});

gulp.task('watch', ['browserSync', 'sass'], () => {
  gulp.watch(config.sassFiles, ['sass']);
  gulp.watch('drakonia_exposed/templates/*.html', browserSync.reload); 
  gulp.watch(config.jsDest + '/*.js', browserSync.reload); 
});
