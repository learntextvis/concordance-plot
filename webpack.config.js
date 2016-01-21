/**
 * Build configuration.
 *
 * This will build the app with the result in the build/ folder
 * Javascript dependencies are built to a separate file as are css
 * and the main html file.
 *
 * The main entry point for the application is src/index.jsx
 */

var webpack = require('webpack');

var minimize = process.argv.indexOf('--minimize') === -1 ? false : true;
var bundle = process.argv.indexOf('--bundle') === -1 ? false : true;


var plugins = [];

if(minimize) {
  plugins.push(new webpack.optimize.UglifyJsPlugin());
}

var filename = "";
var vendorName = "";

if(bundle) {
  filename = 'concordance.all.js';
} else {
  filename = 'concordance.js';
  vendorName = 'concordance.deps.js';
  plugins.push(
    new webpack.optimize.CommonsChunkPlugin('vendor', vendorName)
  );
}

var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  context: __dirname,
  entry: {
    main: './index.js',
    vendor: ['react', 'react-dom', 'd3']
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/dist',
    filename: filename,
    libraryTarget: 'umd'
  },
  debug: false,
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: [
          /node_modules\/keyword_in_context/,
          /src/,
          /index.js/
        ],
        loader: 'babel',
        query: {
          presets: ['react', 'es2015'],
          plugins: ['transform-runtime']
        }
      },
      {
        test: /\.html$/,
        loader: "file?name=[name].[ext]"
      },
      {
        test: /\.css$/, //loader: "style!css!sass"
        loader: 'style!css'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  plugins: plugins
};
