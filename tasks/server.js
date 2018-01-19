import gulp from 'gulp';
import Browser from 'browser-sync';
import webpack from 'webpack';
import webpackConfig from '../webpack.config.js';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import { compile as sass } from './styles';
import gulpConfig from './config';

const browser = Browser.create();
const bundler = webpack(webpackConfig);

export function server() {
  let config = {
    files: ['dist/**/*'],
    middleware: [
      webpackDevMiddleware(bundler, {
        publicPath: webpackConfig.output.publicPath,
        stats: { colors: true }
      }),
      webpackHotMiddleware(bundler),
    ],
    notify: false,
    open: false,
    proxy: 'localhost:5000',
    ui: false,
  };

  browser.init(config);

  gulp.watch('assets/js/**/*.js').on('change', () => browser.reload());
  gulp.watch(gulpConfig.sassFiles, gulp.series(sass));
  gulp.watch(['drakonia_exposed/templates/**/*.html'])
    .on('change', () => browser.reload());
}
