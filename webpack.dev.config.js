const webpack = require(`webpack`)

module.exports = {
  mode: `development`,
  entry: [`react-hot-loader/patch`, `./src/index.js`],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [`babel-loader`],
      },
    ],
  },
  resolve: {
    //
    extensions: [`*`, `.js`, `.jsx`],
  },
  output: {
    path: `${__dirname}/dist`,
    publicPath: `/`,
    filename: `bundle.js`,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // Adds HMR
    new webpack.NamedModulesPlugin(), // Display module path in HMR updates
  ],
  devServer: {
    contentBase: `./dist`, // Serve from dir
    hot: true, // Enable HMR
  },
}
