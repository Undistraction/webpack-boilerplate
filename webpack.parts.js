const webpack = require('webpack');

const StyleLint = require('stylelint');

// Webpack Plugins
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const STYLES_REGEX = /\.css$/;
const JS_REGEX = /\.jsx?$/;
const IMAGES_REGEX = /\.(jpg|png)$/;

// Check if module is a vendored library by checking its path for the presence of 'node_modules'.
function moduleIsVendor(module) {
  const userRequest = module.userRequest;
  // You can perform other similar checks here too.
  // Now we check just node_modules.
  return userRequest && userRequest.indexOf('node_modules') >= 0;
}

// Configuration for Webpack Development Server, enabling HMR
exports.devServer = function (options) {
  return {
    devServer: {
      // Enable history API fallback so HTML5 History API based routing works.
      historyApiFallback: true,
      // Enable hot module replacement
      hot: true,
      // Don't refresh if hot loading fails. If you want refresh behavior, set inline: true instead.
      hotOnly: true,
      // Only display errors to reduce the amount of output.
      stats: 'errors-only',
      // Defaults to `localhost`
      host: options.host,
      // Defaults to 8080
      port: options.port
    },
    plugins: [
      // TODO: Investigate this. What does it do? Is it supported now?
      // Enable multi-pass compilation for enhanced performance in larger projects. Good default.
      new webpack.HotModuleReplacementPlugin({
        // Disabled as this won't work with html-webpack-template yet
        // multiStep: true
      })
    ]
  };
};

// Configuration for JavaScript Linting
exports.lintJavaScript = function (paths) {
  return {
    module: {
      rules: [
        {
          test: JS_REGEX,
          include: paths,
          use: 'eslint-loader',
          // Run before other loaders that handle .js files
          enforce: 'pre'
        }
      ]
    }
  };
};

// Configuration for transpiling ES6 JavaScript to ES5 using Babel
exports.loadJavaScript = function (paths, cacheDirectory = false) {
  return {
    module: {
      rules: [
        {
          test: JS_REGEX,
          include: paths,
          loader: 'babel-loader',
          options: {
            // Enable caching for improved performance
            cacheDirectory
          }
        }
      ]
    }
  };
};

// Configuration for minfiying JavaScript
exports.minifyJavaScript = function ({ useSourceMap }) {
  return {
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: useSourceMap,
        compress: {
          // Show warnings related to code-shaking
          warnings: true,
          // Remove any calls to console
          drop_console: true
        },
        // Don't beautify output
        beautify: false,
        // Remove any comments
        comments: false
      })
    ]
  };
};

// Enable JavaScript sourcemap generation
// @param type The type of sourcemap
exports.generateSourcemaps = function ({ type }) {
  return {
    devtool: type
  };
};

// Configuration for Style Linting using Stylelint.
// @param paths Array of paths to lint
exports.lintCSS = function (paths) {
  return {
    module: {
      rules: [
        {
          test: STYLES_REGEX,
          include: paths,
          // Run before other loaders
          enforce: 'pre',
          loader: 'postcss-loader',
          options: {
            // Neccessary for PostCSS loader to function correctly. Why? I don't know.
            ident: 'postcss',
            plugins() {
              return [
                StyleLint({
                  // Ignore css files inside node modules
                  ignoreFiles: 'node_modules/**/*.css'
                })
              ];
            }
          }
        }
      ]
    }
  };
};

// Configuration compiling styles
// @paths Load paths of style files to include.
exports.loadCSS = function (paths) {
  return {
    module: {
      rules: [
        {
          test: STYLES_REGEX,
          // Only include supplied paths
          include: paths,
          use: [
            {
              loader: 'style-loader'
            },
            {
              loader: 'css-loader',
              options: {
                modules: false,
                sourceMap: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: 'inline'
              }
            }
          ]
        }
      ]
    }
  };
};

// Configuration of Extract-Text generation of CSS file
exports.extractCSS = function ({ outputPath }) {
  return {
    module: {
      rules: [
        {
          test: STYLES_REGEX,
          // Extract CSS
          loader: ExtractTextPlugin.extract({
            fallbackLoader: 'style-loader',
            // Note: that there is no need for styles-loader as we don't want to convert styles
            // to JS
            loader: [
              {
                loader: 'css-loader',
                options: {
                  // Use CSS Modules
                  modules: true,
                  // Minimise output using cssnano.
                  // Note: An object can also be passed containing config options
                  minimize: true
                }
              },
              {
                loader: 'postcss-loader'
              }
            ]
          })
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin(outputPath)
    ]
  };
};

// Removal of unused styles
exports.purifyCSS = function (paths) {
  paths = Array.isArray(paths) ? paths : [paths];

  return {
    plugins: [
      new PurifyCSSPlugin({
        // We use absolute paths so Purify must too.
        basePath: '/',

        // `paths` is used to point PurifyCSS to files not visible to Webpack. This expects glob
        // patterns so we adapt here.
        paths: paths.map(path => `${path}/*`),

        // Only .js files are picked up by default.
        resolveExtensions: ['.html', '.jsx']
      })
    ]
  };
};

exports.loadImages = function () {
  return {
    module: {
      rules: [
        {
          test: IMAGES_REGEX,
          loader: 'url-loader',
          options: {
            // File-size limit (in bytes), upto which images will stored as a data-url.
            // Above this limit they will be loaded conventionally.
            limit: 25000
          }
        }
      ]
    }
  };
};

// Use Commons ChunkGenerate separate bundles for common files
exports.extractBundles = function () {
  return {
    plugins: [
      // Extract bundle containing all vendor libraries
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        // Pass a function used to detect if the module should be added to the vendor chunk.
        minChunks: moduleIsVendor
      }),
      // Extract bundle containing the manifest
      new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest'
      })
    ]
  };
};

// Delete the contents of the build directory.
// @path Path to the build directory
exports.clean = function (path) {
  return {
    plugins: [
      new CleanWebpackPlugin([path])
    ]
  };
};

// Use a base image to generate necessary favicons
exports.generateFavicons = function () {
  return {
    plugins: [
      new FaviconsWebpackPlugin({
        logo: './app/images/favicon/favicon_base.png'
      })
    ]
  };
};
