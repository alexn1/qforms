"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Converter = void 0;
const path_1 = __importDefault(require("path"));
const JsonFile_1 = require("./JsonFile");
const ApplicationEditor_1 = require("./editor/Editor/ApplicationEditor/ApplicationEditor");
const BaseModel_1 = require("./BaseModel");
const BACKEND_DIR_PATH = __dirname;
class Converter {
    static async reformat(appFilePath) {
        console.debug('Convert.reformat', appFilePath);
        const appFile = new JsonFile_1.JsonFile(appFilePath);
        await appFile.read();
        // app
        const appEditor = new ApplicationEditor_1.ApplicationEditor(appFile, path_1.default.join(BACKEND_DIR_PATH, 'editor'));
        appEditor.reformat();
        await appEditor.save();
        // pages
        const pageNames = appEditor
            .getData()
            .pageLinks.map((data) => BaseModel_1.BaseModel.getName(data));
        // console.debug('pageNames:', pageNames);
        // const pageName = pageNames[0];
        for (const pageName of pageNames) {
            const pageEditor = await appEditor.getPage(pageName);
            pageEditor.reformat();
            await pageEditor.save();
        }
    }
}
exports.Converter = Converter;
