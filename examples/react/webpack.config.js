const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot', 'babel'],
      include: [
        path.join(__dirname, 'src')
      ]
    }, {
      test: /\.js$/,
      loaders: ['babel'],
      include: [
        path.resolve('../../packages')
      ]
    }, {
      test: /\.scss$/,
      loaders: ['style', 'css', 'postcss', 'sass']
    }]
  },
  sassLoader: {
    includePaths: [path.resolve('../../packages')]
  },
  postcss: function() {
    return [
      require('autoprefixer')
    ];
  }
};
