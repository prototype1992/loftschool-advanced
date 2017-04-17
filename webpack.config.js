let webpack = require('webpack');
let HtmlPlugin = require('html-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[hash].js',
    path: './dist'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(jpe?g|png|gif|svg|)$/i,
        loader: 'file-loader?name=images/[hash].[ext]'
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader?name=fonts/[hash].[ext]'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader'
        })
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        options: {
          pretty: true
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        drop_debugger: false
      }
    }),
    new ExtractTextPlugin('styles.css'),
    new HtmlPlugin({
      filename: 'index.html',
      chunks: ['index'],
      template: './src/pages/index/index.pug'
    }),
    new HtmlPlugin({
      filename: 'portfolio.html',
      chunks: ['portfolio'],
      template: './src/pages/portfolio/portfolio.pug'
    }),
    new CleanWebpackPlugin(['dist'])
  ]
};
