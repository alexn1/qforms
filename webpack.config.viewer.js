const path = require('path');
const { esbuildLoaderRule, lessCssLoaderRule, frontBase } = require('./webpack.helper');

module.exports = {
    ...frontBase(),
    entry: './src/frontend/index.ts',
    output: {
        clean: true,
        path: path.resolve(__dirname, './dist/frontend/viewer/public'),
        filename: 'js/bundle.[contenthash].js',
        library: {
            name: 'qforms',
            type: 'window',
        },
    },
    module: {
        rules: [esbuildLoaderRule(), lessCssLoaderRule()],
    },
};
