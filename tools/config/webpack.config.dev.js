'use strict';

const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const eslintFormatter = require('react-dev-utils/eslintFormatter');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');

const paths = require('./paths');

//应用根目录
const publicPath = '/';

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: [
    require.resolve('react-hot-loader/patch'),
    require.resolve('react-error-overlay'),
    require.resolve('whatwg-fetch'),
    paths.appIndexJs,
    'webpack-hot-middleware/client?reload=false',
  ],
  output: {
    path: paths.appBuild,
    pathinfo: true,
    filename: 'static/js/bundle.js',
    chunkFilename: 'static/js/[name].chunk.js',
    publicPath: publicPath,
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
    plugins: [
      new ModuleScopePlugin(paths.appSrc),
    ],
  },
  module: {
    strictExportPresence: true,
    rules: [
      //检查代码格式
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        use: [
          {
            options: {
              formatter: eslintFormatter,
            },

            loader: require.resolve('eslint-loader'),
          },
        ],
        include: paths.appSrc,
      },
      //返回哈希内容的文件名称以及路径
      {
        exclude: [
          /\.html$/,
          /\.(js|jsx)$/,
          /\.css$/,
          /\.json$/,
          /\.bmp$/,
          /\.gif$/,
          /\.jpe?g$/,
          /\.png$/,
        ],
        loader: require.resolve('file-loader'),
        options: {
          name: 'static/img/[name].[hash:8].[ext]',
        },
      },
      //小于指定字节的请求返回data url
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          name: 'static/img/[name].[hash:8].[ext]',
        }
      },
      //babel 编译
      {
        test: /\.(js|jsx)$/,
        include: paths.appSrc,
        use:[
          require.resolve('react-hot-loader/webpack'),
          {
            loader: require.resolve('babel-loader'),
            options: {
              cacheDirectory: true
            }
          }
        ],
        //loaders: ['react-hot-loader/webpack', require.resolve('babel-loader')],
      },
      {
        test: /\.css$/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9', // React doesn't support IE8 anyway
                  ],
                  flexbox: 'no-2009',
                })
              ]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
    })
  ],
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
  performance: {
    hints: false,
  },
};