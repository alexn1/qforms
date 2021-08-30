"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Helper_1 = __importDefault(require("./Helper"));
const BaseModel_1 = __importDefault(require("./BaseModel"));
class JsonFile {
    constructor(filePath, data = null) {
        this.filePath = filePath;
        this.data = data;
        this.content = null;
    }
    async create() {
        const exists = await Helper_1.default.exists(this.filePath);
        if (exists)
            throw new Error(`File ${this.filePath} already exists`);
        if (this.data) {
        }
        else if (this.content) {
            this.data = JSON.parse(this.content);
        }
        else {
            this.data = {};
        }
        this.content = JSON.stringify(this.data, null, 4);
        await Helper_1.default.writeFile2(this.filePath, this.content);
    }
    async read() {
        const content = await Helper_1.default.readTextFile(this.filePath);
        this.content = content;
        this.data = JSON.parse(content);
    }
    async save() {
        console.log('JsonFile.save');
        this.content = JSON.stringify(this.data, null, 4);
        await Helper_1.default.writeFile2(this.filePath, this.content);
    }
    getAttr(name) {
        const value = BaseModel_1.default.getAttr(this.data, name);
        if (value === undefined)
            throw new Error(`no attribute '${name}'`);
        return value;
    }
}
module.exports = JsonFile;
