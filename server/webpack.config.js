const path = require('node:path');
const TerserPlugin = require('terser-webpack-plugin'); // Minimize js

module.exports = {
  mode: 'development', // development→production before build
  entry: './src/app.js',
  devtool: 'inline-source-map', // Simplfy tracking errors
  output: {
    filename: 'server.js', // Output name of JS bundles
    path: path.resolve(__dirname, 'dist'), // Output dir
  },
  target: 'node',
  optimization: { minimize: true, minimizer: [new TerserPlugin()] },
  externals: {
    express: 'require(\'express\')', // Supress express warning
    // bufferutil: "bufferutil", // Supress warning while npm build
    // "utf-8-validate": "utf-8-validate", // Supress warning at build
    sharp: 'commonjs sharp', // Removes error while npm build
  },
  // resolve: {
  //   extensions: ["", ".webpack.js", ".web.js", ".js", ".node"]
  // }
};