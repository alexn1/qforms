"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const path_1 = __importDefault(require("path"));
const Model_1 = __importDefault(require("../Model"));
class PageLink extends Model_1.default {
    getPageFilePath() {
        const pageFilePath = path_1.default.join(this.getParent().getDirPath(), this.getAttr('fileName'));
        return pageFilePath;
    }
}
module.exports = PageLink;
