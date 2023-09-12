const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const tsConfigCustom = require('./tsconfig.custom.json');
const { mode } = require('./webpack.helper');

module.exports = {
    devtool: false,
    mode: mode(),
    entry: './src/frontend/monitor/main.ts',
    output: {
        clean: true,
        path: path.resolve(__dirname, './dist/frontend/monitor/public'),
        filename: 'js/bundle.[contenthash].js',
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
        rules: [
            /* {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        onlyCompileBundledFiles: true,
                        ...tsConfigCustom,
                    },
                },
            }, */
            {
                test: /\.tsx?$/,
                loader: 'esbuild-loader',
                options: {
                    tsconfig: './tsconfig.custom.json',
                    keepNames: true,
                },
            },
            {
                test: /\.less$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
            },
        ],
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    keep_classnames: true,
                },
            }),
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/bundle.[contenthash].css',
        }),
    ],
    node: {
        global: false,
    },
};
