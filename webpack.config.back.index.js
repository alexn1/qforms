const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const tsConfigCustom = require('./tsconfig.custom.json');

// console.log('process.env.NODE_ENV', process.env.NODE_ENV);

module.exports = {
    entry: './src/index.ts',
    output: {
        // clean: true,
        path: path.resolve(__dirname, './dist'),
        filename: 'index.js',

        libraryTarget: 'umd',
        library: 'qforms',
        umdNamedDefine: true,
    },
    mode: process.env.NODE_ENV === 'dev' ? 'development' : 'production',
    devtool: false,
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        onlyCompileBundledFiles: false,
                        compilerOptions: {
                            ...tsConfigCustom.compilerOptions,
                            declaration: true,
                        },
                    },
                },
            },
            /* {
                test: /\.tsx?$/,
                loader: 'esbuild-loader',
                options: {
                    tsconfig: './tsconfig.custom.json',
                    keepNames: true,
                },
            }, */
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
    externals: [nodeExternals()],
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
