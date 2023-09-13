function mode() {
    return process.env.NODE_ENV === 'dev' ? 'development' : 'production';
}

function resolve() {
    return {
        extensions: ['.tsx', '.ts', '.js'],
    };
}

module.exports = { mode, resolve };
