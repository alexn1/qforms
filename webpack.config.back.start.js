const path = require('path');
const nodeExternals = require('webpack-node-externals');
// const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

// console.log('process.env.NODE_ENV', process.env.NODE_ENV);

module.exports = {
    entry: './src/start.ts',
    output: {
        // clean: true,
        path: path.resolve(__dirname, './dist'),
        filename: 'start.js',
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
                            target: 'ES2017',
                            declaration: true,
                            esModuleInterop: true,
                            jsx: 'react-jsx',
                            rootDir: 'src',
                            outDir: 'dist',
                            moduleResolution: 'node',
                            module: 'commonjs',
                            resolveJsonModule: true,
                            strictNullChecks: true,
                            noImplicitAny: false,
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
    plugins: [
        // new CopyPlugin({
        //     patterns: [
        //         { from: '**/*.ejs', context: 'src' },
        //         { from: 'frontend/lib/**/*', context: 'src' },
        //     ],
        // }),
    ],
};
