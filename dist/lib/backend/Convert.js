"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const JsonFile_1 = __importDefault(require("./JsonFile"));
const ApplicationEditor_1 = __importDefault(require("./editor/Editor/ApplicationEditor/ApplicationEditor"));
const BaseModel_1 = __importDefault(require("./BaseModel"));
class Convert {
    static async convert(appFilePath) {
        console.log('Convert.convert', appFilePath);
        const appFile = new JsonFile_1.default(appFilePath);
        await appFile.read();
        const appEditor = new ApplicationEditor_1.default(appFile);
        console.log('data:', appEditor.data);
        const pageNames = appEditor.data.pageLinks.map(data => BaseModel_1.default.getName(data));
        console.log('pageNames:', pageNames);
        const pageEditor = await appEditor.getPage(pageNames[0]);
        const formNames = pageEditor.data.forms.map(data => BaseModel_1.default.getName(data));
        console.log('formNames:', formNames);
        const formEditor = pageEditor.createFormEditor(formNames[0]);
    }
}
module.exports = Convert;
