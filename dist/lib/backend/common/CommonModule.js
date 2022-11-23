"use strict";
const Helper = require("../Helper");
const path = require('path');
class CommonModule {
    constructor(hostApp) {
        this.hostApp = hostApp;
    }
    async init() {
        this.css = (await Helper.getFilePaths(path.join(this.hostApp.getFrontendDirPath(), 'common'), 'css')).map(path => `/common/${path}`);
        this.js = (await Helper.getFilePaths(path.join(this.hostApp.getFrontendDirPath(), 'common'), 'js')).map(path => `/common/${path}`);
        // console.log('common.css:', this.css);
        // console.log('common.js:' , this.js);
    }
}
module.exports = CommonModule;
