function mode() {
    return process.env.NODE_ENV === 'dev' ? 'development' : 'production';
}

function resolve() {
    return {
        extensions: ['.tsx', '.ts', '.js'],
    };
}

function tsLoaderRule() {
    const tsConfigCustom = require('./tsconfig.custom.json');
    return {
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

function lessNullLoaderRule() {
    return {
        test: /\.less$/i,
        use: 'null-loader',
    };
}

module.exports = { mode, resolve, tsLoaderRule, esbuildLoaderRule, lessNullLoaderRule };
