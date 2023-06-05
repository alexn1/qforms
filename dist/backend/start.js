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
    try {
        const backHostApp = new index_1.BackHostApp(Object.assign(Object.assign({}, index_1.BkHelper.getCommandLineParams()), { monitor: {
                username: 'admin',
                password: '123qwe',
            } }));
        await backHostApp.run();
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
}
main();
