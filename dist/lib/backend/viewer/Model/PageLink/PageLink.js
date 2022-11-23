"use strict";
const path = require('path');
const Model = require("../Model");
class PageLink extends Model {
    getPageFilePath() {
        const pageFilePath = path.join(this.getParent().getDirPath(), this.getAttr('fileName'));
        return pageFilePath;
    }
}
module.exports = PageLink;
