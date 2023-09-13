const path = require('path');
const nodeExternals = require('webpack-node-externals');
const { esbuildLoaderRule, lessNullLoaderRule, backBase } = require('./webpack.helper');

module.exports = {
    ...backBase(),
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
};
