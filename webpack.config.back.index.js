const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CopyPlugin = require('copy-webpack-plugin');
const { tsLoaderRule, lessNullLoaderRule, backBase } = require('./webpack.helper');

module.exports = {
    ...backBase(),
    entry: './src/index.ts',
    output: {
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
