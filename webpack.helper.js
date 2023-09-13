const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

function backBase() {
    return {
        ...base(),
        target: 'node',
        optimization: backOptimization(),
    };
}

function frontBase() {
    return {
        ...base(),
        node: {
            global: false,
        },
        optimization: frontOptimization(),
        plugins: frontPlugins(),
    };
}

function base() {
    return {
        devtool: false,
        mode: mode(),
        resolve: resolve(),
    };
}

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

function lessCssLoaderRule() {
    return {
        test: /\.less$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
    };
}

function minimizer() {
    return [
        new TerserPlugin({
            terserOptions: {
                keep_classnames: true,
            },
        }),
    ];
}

function frontPlugins() {
    return [
        new MiniCssExtractPlugin({
            filename: 'css/bundle.[contenthash].css',
        }),
    ];
}

function backOptimization() {
    return {
        nodeEnv: false,
        minimizer: minimizer(),
    };
}

function frontOptimization() {
    return {
        minimizer: minimizer(),
    };
}

module.exports = {
    mode,
    resolve,
    tsLoaderRule,
    esbuildLoaderRule,
    lessNullLoaderRule,
    lessCssLoaderRule,
    minimizer,
    frontPlugins,
    base,
    backOptimization,
    frontOptimization,
    backBase,
    frontBase,
};
