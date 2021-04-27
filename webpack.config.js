const path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/scripts/index.js",
  output: {
    path: path.resolve(__dirname, "./dist/js"),
    filename: "bundle.min.js",
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        include: [path.resolve(__dirname, "./src/scripts")],
        loader: "babel-loader",
      },
    ],
  },
};