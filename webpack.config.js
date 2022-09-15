const path = require('path');
const webpack = require('webpack');

module.exports = (env, argv) => {
    console.log('env:', env, argv);
    return {
        entry: './src/backend/start.ts',
        output: {
            clean: true,
            path: path.resolve(__dirname, 'dist2'),
            filename: 'bundle.js'
        },
        devtool: argv.mode === 'development' ? 'inline-source-map' : false,
        module: {
            rules: [
                {
                    test: /\.ts?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
            ]
        },
        plugins: [
            new webpack.DefinePlugin({
                DEBUG: argv.mode === 'development'
            })
        ]
    };
};
