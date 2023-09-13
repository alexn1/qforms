const path = require('path');
const { esbuildLoaderRule, lessCssLoaderRule, frontBase } = require('./webpack.helper');

module.exports = {
    ...frontBase(),
    entry: './src/frontend/monitor/main.ts',
    output: {
        clean: true,
        path: path.resolve(__dirname, './dist/frontend/monitor/public'),
        filename: 'js/bundle.[contenthash].js',
    },
    module: {
        rules: [esbuildLoaderRule(), lessCssLoaderRule()],
    },
};
