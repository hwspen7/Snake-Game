const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    mode: "development",

    entry: "./src/index.ts",

    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",

        environment: {
            arrowFunction: false,
            const: false
        }
    },

    devtool: "inline-source-map",

    devServer: {
        static: {
            directory: path.resolve(__dirname, "dist")
        },
        port: 8080,
        open: true,
        hot: true,
        compress: true
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                [
                                    "@babel/preset-env",
                                    {
                                        targets: {
                                            chrome: "58",
                                            ie: "11"
                                        },
                                        corejs: "3",
                                        useBuiltIns: "usage"
                                    }
                                ]
                            ]
                        }
                    },
                    "ts-loader"
                ]
            },

            // SCSS
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    ["postcss-preset-env", { browsers: "last 2 versions" }]
                                ]
                            }
                        }
                    },
                    "sass-loader"
                ]
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        })
    ],

    resolve: {
        extensions: [".ts", ".js"]
    }
};