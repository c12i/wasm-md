const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require('path');

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
  },
  module: {
    // define what webpack needs to do based on the files it encounters
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        // tells webpack what loader it needs to run
        // the loader is the helper which converts the code to the actual version
        // here we use babel
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        // note that the order in which we insert loaders is important
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      {
        test: /\.html$/,
        use: {
          loader: "html-loader",
        },
      },
    ],
  },
  mode: "development",
  plugins: [
    // The HtmlWebpackPlugin receives a config object when creating an instance
    // The object takes the template of the file it uses as the starting point
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
    new CopyWebpackPlugin(["index.html"]),
  ],
};
