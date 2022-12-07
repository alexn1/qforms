const path = require('path');

module.exports = {
    mode: process.env.NODE_ENV || 'production',
    devtool: false,
    entry: './src/frontend/editor/main.ts',
    output: {
        clean: true,
        path: path.resolve(__dirname, './dist/lib/frontend/editor/js'),
        filename: 'bundle.[contenthash].js',
    },
    /*resolve: {
        extensions: ['.jsx', '.js'],
    },*/
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
        rules: [
            /*{
                test: /\.(js)x?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ['@babel/preset-react', {runtime: 'automatic'}],
                            ]
                        }
                    },
                ],
            },*/
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        onlyCompileBundledFiles: true,
                        compilerOptions: {
                            target: 'ES2017',
                            declaration: false,
                            esModuleInterop: true,
                            jsx: 'react-jsx',
                            moduleResolution: 'node',
                        },
                    },
                },
            },
        ],
    },
};
