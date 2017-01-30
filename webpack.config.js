/*
 * Webpack configuration for development and production builds. Functionality is modularised based
 * on task performed wherever possible and imported from `webpack.parts.js`.
 * `env` is passed in and will be  'production' | 'development'.
 */

// Library Imports
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

// Webpack Plugins
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const HtmlWebpackTemplate = require('html-webpack-template');

// Local Imports
const parts = require('./webpack.parts');

// Paths used in configuration.
const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
};

const PRODUCTION = 'production';
const DEVELOPMENT = 'development';

// Configuration shared by development and production.
const common = merge(
  {
    // Starting point for compilation.
    entry: {
      app: path.join(PATHS.app, 'js')
    },
    output: {
      // path to the generated file(s).
      path: PATHS.build
    },
    plugins: [
      // Easy generation of HTML index page.
      new HTMLWebpackPlugin({
        template: HtmlWebpackTemplate,
        title: 'Webpack Boilerplate',
        appMountId: 'app',
        mobile: true, // Scale page on mobile
        inject: false // html-webpack-template requires this to work
      })
    ],
    resolve: {
      extensions: ['.js', '.jsx']
    }
  },
  // Lint any JavaScript files using ESLint.
  parts.lintJavaScript(PATHS.app),
  // Lint any styles using Stylelint.
  parts.lintCSS(PATHS.app),
  // Generate favicons
  parts.generateFavicons()
);

module.exports = function (env) {
  // Configuration for production builds.
  if (env === PRODUCTION) {
    return merge([
      common,
      {
        output: {
          // Path of compiled application file.
          // Add hash to filename to enable clientside caching.
          // The hash is based on the contents of the chunk.
          filename: '[name].[chunkhash].js'
        },
        plugins: [
          // Use hashes instead of numerical Ids for generated modules.
          new webpack.HashedModuleIdsPlugin(),
          // Display a progress bar during bundling
          new ProgressBarPlugin()
        ],
        // Throw an error when performance issues are discovered during build.
        performance: {
          hints: 'error'
        }
      },
      // Remove all files from the `PATHS.build` directory before a new build.
      parts.clean(PATHS.build),
      // Transpile JavaScript using Babel
      parts.loadJavaScript(PATHS.app),
      // Minify JavaScript and remove unused code (tree shaking).
      // Configure to ensure sourcemaps still work.
      parts.minifyJavaScript({ useSourceMap: true }),
      // Split into multiple bundles for on-demand load and improved caching.
      parts.extractBundles([
        // Define a vendor bundle containing all vendored libs.
        // This can be cached independently of application code.
        {
          name: 'vendor',
          // Add content to be cached
          entries: ['react']
        },
        {
          name: 'manifest'
        }
      ]),
      // Generate sourcemaps for JavaScript code.
      // The `type` parameter governs the type of sourcemap generated. `source-map` is slow to
      // build and rebuild but offers accuracy.
      parts.generateSourcemaps({ type: 'source-map' }),
      // Compile styles and output to a CSS file instead of rendering with JavaScript.
      parts.extractCSS({ outputPath: 'styles/[name].[contentHash].css' }),
      // // Remove unused CSS. Note this runs on the generated CSS.
      parts.purifyCSS(PATHS.app)
    ]);
  }
  // Configuration for Development builds.

  if (env === DEVELOPMENT) {
    return merge(
      common,
      {
        output: {
          // Path of compiled application file.
          filename: '[name].js'
        },
        performance: {
          // Disable performace hints in development as we aren't optimising compilation.
          hints: false
        },
        plugins: [
          new webpack.NamedModulesPlugin()
        ]
      },
      // Transpile JavaScript using Babel, using the default cache directory
      parts.loadJavaScript(PATHS.app, { cacheDirectory: true }),
      // The `type` parameter governs the type of sourcemap generated. `eval-source-map` is slow to
      // build, but faster to rebuild and is very accurate. For faster build and rebuild, but less
      // accuracy (lines only) `cheap-eval-source-map` can be used.
      parts.generateSourcemaps({ type: 'eval-source-map' }),
      // Load styles and render as JavaScript for speed.
      parts.loadCSS(),
      // Load images, inlining if expeditious.
      parts.loadImages(),
      // Run the development server with HMR enabled.
      parts.devServer({
        // Customise host/port
        host: process.env.HOST,
        port: process.env.PORT
      }));
  }

  throw new Error(`Environment ${env} not supported`);
};
