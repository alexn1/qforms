const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

// console.log('process.env.NODE_ENV', process.env.NODE_ENV);

module.exports = {
    entry: './src/backend/start.ts',
    output: {
        // clean: true,
        path: path.resolve(__dirname, './dist/lib'),
        filename: 'backend/bundle.js',
    },
    mode: process.env.NODE_ENV || 'production',
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
                            declaration: true,
                            rootDir: 'src',
                            outDir: 'dist/lib',
                        },
                    },
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
            patterns: [{ from: '**/*.ejs', context: 'src' }],
        }),
    ],
};