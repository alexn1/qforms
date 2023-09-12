function mode() {
    return process.env.NODE_ENV === 'dev' ? 'development' : 'production';
}

module.exports = { mode };
