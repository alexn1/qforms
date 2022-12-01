const path = require('path');

module.exports = {
    entry: './src/frontend/index/main.js',
    output: {
        // clean: true,
        path: path.resolve(__dirname, './dist/lib/frontend/index/js'),
        filename: 'main.js',
    },
    resolve: {
        extensions: ['.jsx', '.js'],
    },
    module: {
        rules: [
            {
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
            },
            /*{
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader'
                }
            }*/
        ],
    },
    mode: process.env.NODE_ENV || 'production',
    devtool: false
};
