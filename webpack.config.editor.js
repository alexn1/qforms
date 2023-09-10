const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const tsConfigCustom = require('./tsconfig.custom.json');

module.exports = {
    mode: process.env.NODE_ENV === 'dev' ? 'development' : 'production',
    devtool: false,
    entry: './src/frontend/editor/main.ts',
    output: {
        clean: true,
        path: path.resolve(__dirname, './dist/frontend/editor/public'),
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
