const path = require('path');
const {
    esbuildLoaderRule,
    lessCssLoaderRule,
    frontBase,
    tsLoaderRule,
} = require('./webpack.helper');

module.exports = {
    ...frontBase(),
    entry: './src/frontend/index/main.ts',
    output: {
        clean: true,
        path: path.resolve(__dirname, './dist/frontend/index/public'),
        filename: 'js/bundle.[contenthash].js',
    },
    module: {
        rules: [
            // esbuildLoaderRule(),
            tsLoaderRule(),
            lessCssLoaderRule(),
        ],
    },
};
