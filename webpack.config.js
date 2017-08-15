const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

//configure assets path
const assetPath = './assets/main/index.js';
const assetPathCritical = './assets/main/index-critical';

//configure babel presets
const babelOptions = {
  "presets": "es2015"
};


module.exports = {
    target: 'web',
    stats: true,
    entry: {
        main: ['./assets/webpack-public-path', assetPath],
        'main-critical': ['./assets/webpack-public-path', assetPathCritical]
    },
    output: {
        path: path.join(__dirname, 'web/assets/scripts'),
        publicPath: '/assets/scripts/',
        filename: '[name].js', // append ?[hash] to fix entry chunks not updated correctly
        chunkFilename: '[name].[chunkhash].js'
    },
    module: {
        rules: [
              {
                  test: /\.js$/,
                  exclude: /node_modules/,
                  loader: 'babel-loader',
                  options: babelOptions
              },
              {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                  fallback: 'style-loader',
                  use: [
                    {
                      loader: 'css-loader',
                      options: {
                        importLoaders: 1,
                        plugins: (loader) => [
                          require('postcss-import')({root: loader.resourcePath}),
                          require('postcss-cssnext')(),
                          require('cssnano')()
                        ],
                      }
                    },
                    'postcss-loader'
                  ]
                })
              },
                {
                  test: /\.(png|svg|jpg|gif)$/,
                  loader: 'file-loader',
                  options: {
                    name: 'static/[hash].[ext]',
                  }
                },
                {
                  test: /\.(woff|woff2|eot|ttf|otf)$/,
                  loader: 'file-loader',
                  options: {
                    name: 'static/[hash].[ext]',
                  }
                },
                {
                    test: /modernizr\.js$/,
                    use: ['imports-loader?this=>window', 'exports-loader?window.Modernizr']
                },
                {
                    test: /cssrelpreload\.js$/,
                    loaders: ['imports-loader?this=>window']
                }

            ]

    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.ProvidePlugin({
          // Automtically detect jQuery and $ as free var in modules
          // and inject the jquery library
          // This is required by many jquery plugins
          jQuery: 'jquery',
          $: 'jquery'
        }),
        // OccurrenceOrderPlugin is needed for long-term caching to work properly.
        // See http://mxs.is/googmv
        new webpack.optimize.OccurrenceOrderPlugin(true),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            }
        }),
        new webpack.NoEmitOnErrorsPlugin(),

        new ExtractTextPlugin('[name].css')
    ]
};
