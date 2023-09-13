const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CopyPlugin = require('copy-webpack-plugin');
const { mode, resolve, tsLoaderRule, lessNullLoaderRule, minimizer } = require('./webpack.helper');

// console.log('process.env.NODE_ENV', process.env.NODE_ENV);

module.exports = {
    target: 'node',
    devtool: false,
    mode: mode(),
    resolve: resolve(),
    entry: './src/index.ts',
    output: {
        // clean: true,
        path: path.resolve(__dirname, './dist'),
        filename: 'index.js',

        libraryTarget: 'umd',
        library: 'qforms',
        umdNamedDefine: true,
    },
    module: {
        rules: [tsLoaderRule(), lessNullLoaderRule()],
    },
    externals: [nodeExternals()],
    optimization: {
        nodeEnv: false,
        minimizer: minimizer(),
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: '**/*.ejs', context: 'src' },
                { from: 'frontend/lib/**/*', context: 'src' },
                { from: 'frontend/**/*.ico', context: 'src' },
            ],
        }),
    ],
};
