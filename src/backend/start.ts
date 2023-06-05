var Module = require('module');
var originalRequire = Module.prototype.require;
Module.prototype.require = function () {
    if (/\.less$/.test(arguments[0])) {
        // console.log(arguments[0]);
    } else {
        return originalRequire.apply(this, arguments);
    }
};

import { BackHostApp, BkHelper } from './index';

async function main() {
    // console.log('main');
    try {
        const backHostApp = new BackHostApp({
            ...BkHelper.getCommandLineParams(),
            monitor: {
                username: 'admin',
                password: '123qwe',
            },
        });
        await backHostApp.run();
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}
main();
