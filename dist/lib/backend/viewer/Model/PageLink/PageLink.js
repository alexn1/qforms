"use strict";
const path = require('path');
const Model_1 = require("../Model");
class PageLink extends Model_1.Model {
    getPageFilePath() {
        const pageFilePath = path.join(this.getParent().getDirPath(), this.getAttr('fileName'));
        return pageFilePath;
    }
}
module.exports = PageLink;
