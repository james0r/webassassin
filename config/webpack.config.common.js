const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, '../src/index.js'),
  plugins: [
    new MiniCssExtractPlugin({
        filename: 'bundle.css',
    }),
    new CopyWebpackPlugin({
      patterns: [
        { 
          from: "../src/public/", 
          to: "../dist/" ,
          context: "config/",
        },
      ],
    }),
  ],
  output: {
    filename: '../dist/bundle.js',
    path: path.resolve(__dirname, '../dist'),
  }
};