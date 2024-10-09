import path from 'path';

const __dirname = path.resolve();

import HtmlWebpackPlugin from 'html-webpack-plugin';
import {CleanWebpackPlugin} from 'clean-webpack-plugin';

export default {
    entry: './src/index.js',
    mode: 'development',
    output: {
        publicPath: '/',
        path: path.resolve(__dirname, '../dist/')
    },
    module: {
        rules: [
            {
                test: /\.(less|css)$/,
                exclude: /\.m\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ],
            },
            {
                test: /\.m\.less$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                mode: 'local',
                                localIdentName: '[name]__[local]-[hash:base64:5]'
                            }
                        }
                    },
                    'postcss-loader',
                    'less-loader'
                ],
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, 'src'),
            "@com": path.resolve(__dirname, 'src/components')
        }
    },
    devServer: {
        historyApiFallback: true,
        hot: true,
        host: 'localhost',
        port: '8081'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./src/index.html",
            inject: true,
            path: "/dist/",
        }),
        new CleanWebpackPlugin()
    ]
}