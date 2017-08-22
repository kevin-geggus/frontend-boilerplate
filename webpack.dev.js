const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

//configure assets path
const assetPath = './assets/main/index.js';
const assetPathCritical = './assets/main/index-critical';

const webpackConfig = {
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
                loader: 'babel-loader'
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
                                minimize: false,
                            }
                        },
                        'postcss-loader'
                    ]
                })
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                loaders: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'static/[hash].[ext]',
                        },
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                quality: 65
                            },
                            pngquant:{
                                quality: "65-90",
                                speed: 4
                            },
                            svgo:{
                                plugins: [
                                    {
                                        removeViewBox: false
                                    },
                                    {
                                        removeEmptyAttrs: false
                                    }
                                ]
                            },
                            gifsicle: {
                                optimizationLevel: 7,
                                interlaced: false
                            },
                            optipng: {
                                optimizationLevel: 7,
                                interlaced: false
                            }
                        }
                    },
                ],
            },
            {
              test: /\.(woff|woff2|eot|ttf|otf)$/,
              loader: 'file-loader',
              options: {
                  name: 'static/[hash].[ext]',
              }
            },
            {
                test: /cssrelpreload\.js$/,
                loaders: ['imports-loader?this=>window']
            }

        ]

    },

    plugins: [
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
        new webpack.NoEmitOnErrorsPlugin(),

        new ExtractTextPlugin('[name].css')
    ]
};

module.exports = webpackConfig;
