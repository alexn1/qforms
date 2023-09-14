const path = require('path');
const { frontBase } = require('./webpack.helper');

module.exports = {
    ...frontBase(),
    entry: './src/frontend/index/main.ts',
    output: {
        clean: true,
        path: path.resolve(__dirname, './dist/frontend/index/public'),
        filename: 'js/bundle.[contenthash].js',
    },
};
