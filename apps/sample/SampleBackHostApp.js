const { BackHostApp } = require('../../dist');

class SampleBackHostApp extends BackHostApp {
    initCustomRoutes() {
        this.getPostAlias(
            /^\/page\/Page1\/(\d+)-([a-z0-9\-]+)$/,
            ['viewer', 'sample', 'sample', 'local', 'localhost'],
            {
                page: 'Page1',
                0: null, // id
                1: null, // some words and numbers seprated by minus
            },
        );
    }
}

module.exports = { SampleBackHostApp };
