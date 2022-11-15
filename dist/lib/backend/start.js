"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
main();
async function main() {
    // console.log('main');
    const backHostApp = new index_1.BackHostApp(index_1.Helper.getCommandLineParams());
    try {
        await backHostApp.run();
    }
    catch (err) {
        await backHostApp.logError(err);
    }
}
