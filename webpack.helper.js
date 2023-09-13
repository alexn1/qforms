function mode() {
    return process.env.NODE_ENV === 'dev' ? 'development' : 'production';
}

function resolve() {
    return {
        extensions: ['.tsx', '.ts', '.js'],
    };
}

function esbuildLoaderRule() {
    return {
        test: /\.tsx?$/,
        loader: 'esbuild-loader',
        options: {
            tsconfig: './tsconfig.custom.json',
            keepNames: true,
        },
    };
}

module.exports = { mode, resolve, esbuildLoaderRule };
