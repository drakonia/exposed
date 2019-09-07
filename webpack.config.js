/* eslint-env node */

const path = require('path');
const webpack = require('webpack');

const environments = require('gulp-environments');
const production = environments.production();
// const development = environments.development();

module.exports = {
  entry: {
    main: production ? [
      path.resolve(__dirname, 'assets/js/main.js'),
    ] : [
      path.resolve(__dirname, 'assets/js/main.js'),
      'webpack/hot/dev-server',
      'webpack-hot-middleware/client',
    ],
    vendor: ['handlebars'],
  },
  output: {
    path: path.resolve(__dirname, 'drakonia_exposed/static/dist/js'),
    publicPath: '/static/dist/js',
    filename: '[name].bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.js?/,
        exclude: [path.resolve(__dirname, 'node_modules')],
        include: [path.resolve(__dirname, 'assets/js/')],
        loaders: ['babel-loader?presets[]=env', 'webpack-module-hot-accept'],
        // loaders: ['babel-loader?presets[]=env'],
      },
      {
        test: /\.handlebars$/,
        loader: 'handlebars-loader'
      }
    ]
  },
  plugins: production ? [
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
    }),
    // new webpack.ProvidePlugin({
    //   '$': 'jquery',
    // }),
  ] : [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  resolve: {
    modules: [
      'node_modules',
      'drakonia_exposed/static/html/partials',
      'assets/js'
    ],
    alias: {
      'handlebars': 'handlebars/runtime.js'
    }
  }
};
