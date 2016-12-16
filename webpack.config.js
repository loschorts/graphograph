module.exports = {
  context: __dirname + "/app",
  entry: ['babel-polyfill',"./index.js"],
  output: {
      path: __dirname + "/dist",
      filename: "bundle.js"
  },
  module: {  
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-0']
        }
      }
    ]
  },
  devtool: 'source-map'
}