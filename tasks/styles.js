import config from './config';
import gulp from 'gulp';
import notify from 'gulp-notify';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import postcss from 'gulp-postcss';
import stylelint from 'gulp-stylelint';
import cleanCSS from 'gulp-clean-css';

gulp.task('sass', () => {

});

function compile() {
  return gulp.src(config.sassFiles)
    .pipe(sourcemaps.init())
    .pipe(sass(config.sassOptions).on('error', function(err) {
      notify().write(err);
      this.emit('end');
    }))
    .pipe(sourcemaps.write())
    .pipe(postcss(config.postcss))
    .pipe(gulp.dest(config.sassDest));
}

function lint() {
  return gulp.src(config.sassFiles)
    .pipe(stylelint({
      reporters: [{
        formatter: 'string',
        console: true
      }]
    }));
}

function minify() {
  return gulp.src(config.sassDest + '/*.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest(config.sassDest));
}

export { compile, lint, minify };

//
// gulp.task('css-minify', gulp.series('sass', () => {
//
// }));
//
// gulp.task('styles', gulp.series('sass', 'stylelint'))
