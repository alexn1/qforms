"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Module = require('module');
var originalRequire = Module.prototype.require;
Module.prototype.require = function () {
    if (/\.less$/.test(arguments[0])) {
        // console.log(arguments[0]);
    }
    else {
        return originalRequire.apply(this, arguments);
    }
};
const index_1 = require("./index");
async function main() {
    // console.log('main');
    const backHostApp = new index_1.BackHostApp(Object.assign(Object.assign({}, index_1.BkHelper.getCommandLineParams()), { monitor: {
            username: 'admin',
            password: '123qwe',
        } }));
    try {
        await backHostApp.init();
        const code = await backHostApp.run();
        console.log('code:', code);
        if (code) {
            process.exit(code);
        }
    }
    catch (err) {
        await backHostApp.logError(err);
    }
}
main();
