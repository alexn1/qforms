"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const JsonFile_1 = __importDefault(require("./JsonFile"));
const ApplicationEditor_1 = __importDefault(require("./editor/Editor/ApplicationEditor/ApplicationEditor"));
class Convert {
    static async convert(appFilePath) {
        console.log('Convert.convert', appFilePath);
        const appFile = new JsonFile_1.default(appFilePath);
        await appFile.read();
        const appEditor = new ApplicationEditor_1.default(appFile);
    }
}
module.exports = Convert;
