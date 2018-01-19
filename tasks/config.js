import autoprefixer from 'autoprefixer';
import pxtorem from 'postcss-pxtorem';

const dist = './drakonia_exposed/static/dist';

module.exports = {
  dist: dist,
  jsFiles: ['assets/js/**/*.js'],
  postcss: [
    autoprefixer({
      browsers: 'last 2 versions'
    }),
    pxtorem({
      propList: ['*'],
      rootValue: 12
    })
  ],
  sassDest: dist + '/css',
  sassFiles: './assets/scss/**/*.scss',
  sassOptions: {
    includePaths: ['node_modules/normalize-scss/sass'],
    errLogToConsole: true,
    outputStyle: 'expanded'
  }
};
