
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = merge(common, {
    mode: 'production',
    output: {
        path: path.join(__dirname, '../prod/js'),
        filename: '[name].js'
    },
    plugins: [
        new CopyWebpackPlugin([{
            from:  path.join(__dirname, '../public'),
            to:  path.join(__dirname, '../prod')
        }, {
            from: path.join(__dirname, "../node_modules/bulma/css/bulma.min.css"),
            to: path.join(__dirname, "../prod/css/bulma.min.css")
        }], {
            copyUnmodified: true
        })
    ]
});