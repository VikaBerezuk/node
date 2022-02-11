const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');

const envs = dotenv.config();
dotenvExpand.expand(envs);

const isDevMode = process.env.NODE_ENV !== 'production';

function getAppSrc() {
  return path.resolve(process.cwd(), 'src');
}

module.exports = {
  mode: isDevMode ? 'development' : 'production',
  entry: './src/index.js',
  module: {
    rules: [
      { test: /\.(ts)$/, use: 'babel-loader' },
      { test: /\.s[c]ss$/i, use: ['style-loader', 'css-loader', 'sass-loader'] },
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.json', '.js'],
    symlinks: false,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      chunks: ['main'],
    }),
  ],
  devtool: 'source-map',
  devServer: {
    hot: true,
    open: true, // ['/login.html'],
    compress: true,
    host: 'localhost',
    port: 3003,
    allowedHosts: 'all',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers': '*',
    },
    static: {
      directory: path.join(process.cwd(), 'dist'),
      publicPath: '',
      watch: {
        ignored: getAppSrc(),
      },
    },
    client: {
      logging: 'info',
      overlay: {
        errors: true,
        warnings: false,
      },
    },
    devMiddleware: {
      publicPath: '',
    },
  },
};
