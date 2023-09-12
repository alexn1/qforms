const path = require('path');
const nodeExternals = require('webpack-node-externals');
const TerserPlugin = require('terser-webpack-plugin');
const tsConfigCustom = require('./tsconfig.custom.json');
const { mode } = require('./webpack.helper');

// console.log('process.env.NODE_ENV', process.env.NODE_ENV);

module.exports = {
    devtool: false,
    mode: mode(),
    entry: './src/start.ts',
    output: {
        // clean: true,
        path: path.resolve(__dirname, './dist'),
        filename: 'start.js',
    },
    module: {
        rules: [
            /* {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        onlyCompileBundledFiles: false,
                        ...tsConfigCustom,
                    },
                },
            }, */
            {
                test: /\.tsx?$/,
                loader: 'esbuild-loader',
                options: {
                    tsconfig: './tsconfig.custom.json',
                    keepNames: true,
                },
            },
            {
                test: /\.less$/i,
                use: 'null-loader',
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    target: 'node',
    externals: [nodeExternals(), './index'],
    externalsType: 'commonjs',
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
    plugins: [],
};
