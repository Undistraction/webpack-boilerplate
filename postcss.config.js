/* eslint-disable global-require */

module.exports = {
  plugins: [
    require('postcss-cssnext')({
      browsers: ['last 2 versions']
    }),
    require('postcss-import')(),
    require('postcss-simple-vars'),
    require('postcss-nested'),
    require('postcss-color-function')
  ]
};
