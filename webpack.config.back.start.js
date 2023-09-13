const path = require('path');
const nodeExternals = require('webpack-node-externals');
const {
    mode,
    resolve,
    esbuildLoaderRule,
    lessNullLoaderRule,
    minimizer,
} = require('./webpack.helper');

// console.log('process.env.NODE_ENV', process.env.NODE_ENV);

module.exports = {
    target: 'node',
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
    externals: [nodeExternals(), './index'],
    externalsType: 'commonjs',
    optimization: {
        nodeEnv: false,
        minimizer: minimizer(),
    },
};
