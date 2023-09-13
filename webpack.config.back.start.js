const path = require('path');
const nodeExternals = require('webpack-node-externals');
const TerserPlugin = require('terser-webpack-plugin');
const { mode, resolve, esbuildLoaderRule, lessNullLoaderRule } = require('./webpack.helper');

// console.log('process.env.NODE_ENV', process.env.NODE_ENV);

module.exports = {
    devtool: false,
    mode: mode(),
    resolve: resolve(),
    entry: './src/start.ts',
    output: {
        // clean: true,
        path: path.resolve(__dirname, './dist'),
        filename: 'start.js',
    },
    module: {
        rules: [esbuildLoaderRule(), lessNullLoaderRule()],
    },
    target: 'node',
    externals: [nodeExternals(), './index'],
    externalsType: 'commonjs',
    optimization: {
        nodeEnv: false,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    keep_classnames: true,
                },
            }),
        ],
    },
    plugins: [],
};
