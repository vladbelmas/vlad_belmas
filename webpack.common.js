const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const chokidar = require('chokidar');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');



module.exports = {
    mode: 'development',
    devServer: {
        before(app, server) {
            chokidar.watch([
                './*.html'
            ]).on('all', function() {
                server.sockWrite(server.sockets, 'content-changed');
            })
        },
        historyApiFallback: true,
        contentBase: path.resolve(__dirname, './dist'),
        open: true,
        hot: true,
        port: 8080,
    },
    entry: {
        index: './js/index.js',
    },

    devtool: 'inline-source-map',
    plugins: [
        new MiniCssExtractPlugin(),

        new HtmlWebpackPlugin({
            template: './index.html',
            inject: true
        }),
        new CopyPlugin({
            patterns: [
                { from: 'i', to: path.resolve(__dirname, './dist/i') },
            ],
        }),
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, './dist'),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.s?[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        'autoprefixer',
                                    ],
                                ],
                            },
                        },
                    },
                    {
                        loader: 'resolve-url-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/'
                        }
                    }
                ]
            }
        ],
    },
};
