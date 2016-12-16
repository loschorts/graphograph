module.exports = {
  context: __dirname + "/app",
  entry: "./index.js",
  output: {
      path: __dirname + "/dist",
      filename: "bundle.js"
  },
  loaders: [
    {
      test: /\.js$/,
      exclude: /(node_modules)/,
      loader: 'babel',
      query: {
        presets: ['es2015']
      }
    }
  ],
  devtool: 'source-map'
}