const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = merge(common, {
    devtool: 'inline-source-map',
    mode: 'development',
    output: {
        path: path.join(__dirname, '../dist/js'),
        filename: '[name].js'
    },
    plugins: [
        new CopyWebpackPlugin([{
            from:  path.join(__dirname, '../public'),
            to:  path.join(__dirname, '../dist')
        }, {
            from: path.join(__dirname, "../node_modules/bulma/css/bulma.min.css"),
            to: path.join(__dirname, "../dist/css/bulma.min.css")
        }], {
            copyUnmodified: true
        })
    ]
});