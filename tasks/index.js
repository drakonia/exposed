import gulp from 'gulp';

import * as scripts from './scripts';
import { server }  from './server';
import * as styles from './styles';

const dev = gulp.series(
  server,
  styles.compile,
  styles.lint,
  styles.minify
);

const build = gulp.series(
  scripts.bundle, scripts.lint,
  styles.compile, styles.lint, styles.minify
);

export { dev, build };

export default dev;
