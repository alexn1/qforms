"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
async function main() {
    // console.log('main');
    const backHostApp = new index_1.BackHostApp(Object.assign(Object.assign({}, index_1.Helper.getCommandLineParams()), { monitor: {
            username: 'admin',
            password: '123qwe',
        } }));
    try {
        const result = await backHostApp.run();
        if (result) {
            process.exit(result);
        }
    }
    catch (err) {
        await backHostApp.logError(err);
    }
}
main();
