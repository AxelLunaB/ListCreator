const path = require('path');
var webpack = require('webpack');
const BundleTracker = require('webpack-bundle-tracker');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

var dist_dir = '/public/assets';
var use_hot_reload = process.env.NODE_ENV !== 'production';
var dev_server_addr = '0.0.0.0';
var dev_server_port = 3031;

function resolve (dir) {
  return path.join(__dirname, dir)
}


module.exports  = {
  entry: {
    main: ['./frontend/entries/main.js'],
    login: ['./frontend/entries/login.js'],
  },
  output: {
    path: path.resolve(__dirname, '.' + dist_dir + '/'),
    filename:  '[name].js',
    publicPath: '/static/assets/',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader']
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { sourceMap: true } },
            { loader: 'postcss-loader', options: { sourceMap: true } },
            { loader: 'sass-loader', options: { sourceMap: true } }
          ]
        })
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'

      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this nessessary.
            'scss': 'vue-style-loader!css-loader!sass-loader',
            'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
          }
        }
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: 'images/[name].[ext]?[hash]'
        }
      },
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new ExtractTextPlugin('[name].css'),
    new BundleTracker({ filename: './webpack-stats.json' }),
  ],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.common.js',
      '@': resolve('frontend'),
    }
  },
}
