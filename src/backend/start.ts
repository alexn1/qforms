var Module = require('module');
var originalRequire = Module.prototype.require;
Module.prototype.require = function () {
    if (/\.less$/.test(arguments[0])) {
        // console.log(arguments[0]);
    } else {
        return originalRequire.apply(this, arguments);
    }
};

import { BackHostApp, Helper } from './index';

async function main() {
    // console.log('main');
    const backHostApp = new BackHostApp({
        ...Helper.getCommandLineParams(),
        monitor: {
            username: 'admin',
            password: '123qwe',
        },
    });
    try {
        const result = await backHostApp.run();
        if (result) {
            process.exit(result);
        }
    } catch (err) {
        await backHostApp.logError(err);
    }
}
main();
