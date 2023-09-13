const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { mode, resolve, tsLoaderRule } = require('./webpack.helper');

// console.log('process.env.NODE_ENV', process.env.NODE_ENV);

module.exports = {
    devtool: false,
    mode: mode(),
    resolve: resolve(),
    entry: './src/index.ts',
    output: {
        // clean: true,
        path: path.resolve(__dirname, './dist'),
        filename: 'index.js',

        libraryTarget: 'umd',
        library: 'qforms',
        umdNamedDefine: true,
    },
    module: {
        rules: [
            tsLoaderRule(),
            {
                test: /\.less$/i,
                use: 'null-loader',
            },
        ],
    },
    target: 'node',
    externals: [nodeExternals()],
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
