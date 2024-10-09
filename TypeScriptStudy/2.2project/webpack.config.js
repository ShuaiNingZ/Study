const path = require('path');
// 引入生成 html 插件
const HTMLWebpackPlugin = require('html-webpack-plugin');
// 引入 clean 插件
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        // webpack 代码环境配置
        environment: {
            // 不使用 箭头函数
            arrowFunction: false
        }
    },
    module: {
        rules: [
            {
                test: /\.ts/,
                use: [
                    {
                        loader: 'babel-loader',
                        // 设置 babel
                        options: {
                            // 设置预定义的环境
                            presets: [
                                [
                                    '@babel/preset-env',
                                    {
                                        // 要兼容的浏览器版本
                                        targets: {
                                            chrome: 58,
                                            ie: 11
                                        },
                                        // 指定 corejs 的版本
                                        corejs: 3,
                                        // 使用 corejs 的方式 usage 表示按需加载
                                        useBuiltIns: "usage"
                                    }
                                ]
                            ]
                        }
                    },
                    'ts-loader'
                ],
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                        {
                                            browsers: 'last 2 versions'
                                        }
                                    ]
                                ]
                            }
                        }
                    },
                    "less-loader"
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            // title: '自定义 html title'
            template: './src/index.html'
        })
    ],
    // 用于设置模块引入, 表示哪些文件可以引入
    resolve: {
        extensions: ['.ts', '.js']
    }
}
