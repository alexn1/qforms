const path = require('path');
const nodeExternals = require('webpack-node-externals');
const {
    esbuildLoaderRule,
    lessNullLoaderRule,
    backBase,
    tsLoaderRule,
} = require('./webpack.helper');

module.exports = {
    ...backBase(),
    entry: './src/start.ts',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'start.js',
    },
    module: {
        rules: [
            // esbuildLoaderRule(),
            tsLoaderRule(),
            lessNullLoaderRule(),
        ],
    },
    externals: [nodeExternals(), './index'],
    externalsType: 'commonjs',
};
