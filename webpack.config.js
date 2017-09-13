const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const path = require("path");
const bootstrapEntryPoints = require('./webpack.bootstrap.config');
const glob = require('glob-all');
const PurifyCSSPlugin = require('purifycss-webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');

const isProd = process.argv.indexOf('-p') !== -1;
const cssDev = ['style-loader', 'css-loader', 'sass-loader'];
const cssProd = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    loader: ['css-loader', 'sass-loader'],
    publicPath: '../'
});

const cssConfig = isProd ? cssProd : cssDev;
const bootstrapConfig = isProd ? bootstrapEntryPoints.prod : bootstrapEntryPoints.dev;

module.exports = {
    entry: {
        app: './src/js/index.js',
        bootstrap: bootstrapConfig

    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: 'js/[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: cssConfig
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.(jpe?g|png|gif)$/i,
                use: [
                    'file-loader?name=images/[name].[ext]',
                    'image-webpack-loader'
                ]
            },
            { test: /\.(woff2?|svg)$/, loader: 'url-loader?limit=10000&name=fonts/[name].[ext]' },
            { test: /\.(ttf|eot)$/, loader: 'file-loader?name=fonts/[name].[ext]' },
            { test: /bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/, loader: 'imports-loader?jQuery=jquery' }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        hot: true,
        open: true,
        stats: 'errors-only',
        historyApiFallback: true
    },
    plugins: [

        new HtmlWebpackPlugin({
            title: 'Project React',
            hash: true,
            template: './src/index.html'
        }),

        new ExtractTextPlugin({
            filename: 'css/[name].css',
            disabled: !isProd,
            allChunks: true
        }),

        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new PurifyCSSPlugin({
            paths: glob.sync([
                path.join(__dirname, 'src/*.html'),
                path.join(__dirname, 'src/js/*.js')
            ]),
            styleExtensions:['.css','.scss', '.sass']
        }),
        new CopyWebpackPlugin([
            {
                from: 'src/**/*.png',
                to: 'images/[name].[ext]'
            },
            {
                from: 'src/**/*.jpg',
                to: 'images/[name].[ext]'
            }
        ]),


    ]
};