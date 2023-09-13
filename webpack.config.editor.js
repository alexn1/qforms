const path = require('path');
const {
    mode,
    resolve,
    esbuildLoaderRule,
    lessCssLoaderRule,
    minimizer,
    frontPlugins,
    base,
} = require('./webpack.helper');

module.exports = {
    ...base(),
    node: {
        global: false,
    },
    entry: './src/frontend/editor/main.ts',
    output: {
        clean: true,
        path: path.resolve(__dirname, './dist/frontend/editor/public'),
        filename: 'js/bundle.[contenthash].js',
    },
    module: {
        rules: [esbuildLoaderRule(), lessCssLoaderRule()],
    },
    optimization: {
        minimizer: minimizer(),
    },
    plugins: frontPlugins(),
};
