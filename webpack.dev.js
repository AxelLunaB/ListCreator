const path = require('path');
var webpack = require('webpack');
const BundleTracker = require('webpack-bundle-tracker');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const Jarvis = require("webpack-jarvis");

let localIp = require('get-my-local-ip');

const merge = require('webpack-merge');
const common = require('./webpack.common.js');

var dist_dir = '/static/assets';
var use_hot_reload = process.env.NODE_ENV !== 'production';
const dev_server_addr = localIp.address;
const dev_server_port = 3031;

module.exports = merge(common, {
    devServer: {
        contentBase: './dist',
        historyApiFallback: true,
        noInfo: true
    },
    devtool: 'inline-source-map',
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.common.js'
        }
    },
    plugins:[
      // new Jarvis({
      //   port: 1337 // optional: set a port
      // }),
      // new BundleAnalyzerPlugin()
    ],
});


if (process.env.NODE_ENV === 'production')
{
    module.exports.devtool = '#source-map'
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new UglifyJsPlugin({
            sourceMap: true,
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ])
}
else if (use_hot_reload)
{
    // module.exports.entry.push('webpack-dev-server/client?http://' + dev_server_addr + ':' + dev_server_port);
    // module.exports.entry.push('webpack/hot/only-dev-server');
    for(var key in module.exports.entry) {
        module.exports.entry[key].push('webpack/hot/only-dev-server');
        module.exports.entry[key].push('webpack-dev-server/client?http://' + dev_server_addr + ':' + dev_server_port);
    }
    module.exports.output['publicPath'] = 'http://' + dev_server_addr + ':' + dev_server_port + dist_dir + '/';
    module.exports.plugins.push(new webpack.HotModuleReplacementPlugin());
    module.exports.plugins.push(new webpack.NoEmitOnErrorsPlugin()); // don't reload if there is an error
}
