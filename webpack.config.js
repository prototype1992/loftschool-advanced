const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
  source: path.join(__dirname, 'source'),
  build: path.join(__dirname, 'build')
};

const common = {
  // entry: {
  //   'index': PATHS.source + '/pages/index/index.js',
  //   'blog': PATHS.source + '/pages/blog/blog.js'
  // },
  entry: {
    'index': PATHS.source + '/entry.js'
  },
  output: {
    path: PATHS.build,
    filename: '[name].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      chunks: ['index'],
      template: PATHS.source + '/pages/index/index.pug'
    }),
    new HtmlWebpackPlugin({
      filename: 'blog.html',
      chunks: ['blog'],
      template: PATHS.source + '/pages/blog/blog.pug'
    })
  ],
  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        options: {
          pretty: true
        }
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg|)$/i,
        loader: 'file?name=images/[hash].[ext]'
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file?name=fonts/[hash].[ext]'
      }
    ]
  }
};

const developmentConfig = {
  devServer: {
    stats: 'errors-only',
    port: 9000
  }
};



module.exports = function (env) {
  if( env === 'production' ) {
    return common;
  }
  if( env === 'development' ) {
    return Object.assign(
      {},
      common,
      developmentConfig
    );
  }
};
