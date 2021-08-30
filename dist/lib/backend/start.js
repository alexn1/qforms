"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
function getCommandLineParams() {
    return process.argv
        .map(arg => arg.split('='))
        .reduce((acc, [name, value]) => {
        acc[name] = value;
        return acc;
    }, {});
}
main();
function main() {
    new index_1.BackHostApp(getCommandLineParams()).run();
}
