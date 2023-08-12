/* var Module = require('module');
var originalRequire = Module.prototype.require;
Module.prototype.require = function () {
    if (/\.less$/.test(arguments[0])) {
        // console.debug(arguments[0]);
    } else {
        return originalRequire.apply(this, arguments);
    }
}; */

import { BackHostApp, BkHelper } from './index';
import { debug, error } from './console';

async function main() {
    debug('main');
    try {
        const backHostApp = new BackHostApp({
            ...BkHelper.getCommandLineParams(),
            monitor: {
                username: 'admin',
                password: '123qwe',
            },
        });
        await backHostApp.init();
        await backHostApp.run();
    } catch (err) {
        error(err);
        process.exit(1);
    }
}
main();
