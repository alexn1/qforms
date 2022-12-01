"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
main();
async function main() {
    // console.log('main');
    const backHostApp = new index_1.BackHostApp(Object.assign(Object.assign({}, index_1.Helper.getCommandLineParams()), { monitor: {
            username: 'admin',
            password: '123qwe'
        } }));
    try {
        await backHostApp.run();
    }
    catch (err) {
        await backHostApp.logError(err);
    }
}
