/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');

const envs = dotenv.config();
dotenvExpand.expand(envs);

const isDevMode = process.env.NODE_ENV !== 'production'; // false;

module.exports = {
  mode: isDevMode ? 'development' : 'production',
  entry: './src/index.ts',
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
    extensions: ['.ts', '.tsx', '.json', 'js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      chunks: ['main'],
    }),
  ],
  devtool: 'source-map',
};
