const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: process.env.NODE_ENV || 'production',
    devtool: false,
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
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        onlyCompileBundledFiles: true,
                        compilerOptions: {
                            target: 'ES2017',
                            esModuleInterop: true,
                            jsx: 'react-jsx',
                            rootDir: 'src',
                            outDir: 'dist',
                            moduleResolution: 'node',
                            noImplicitAny: false,
                            strictNullChecks: true,
                        },
                    },
                },
            },
            {
                test: /\.less$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
            },
        ],
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    keep_classnames: true,
                },
            }),
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/bundle.[contenthash].css',
        }),
    ],
};
