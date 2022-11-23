"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageLink = void 0;
const path = require('path');
const Model_1 = require("../Model");
class PageLink extends Model_1.Model {
    getPageFilePath() {
        const pageFilePath = path.join(this.getParent().getDirPath(), this.getAttr('fileName'));
        return pageFilePath;
    }
}
exports.PageLink = PageLink;
