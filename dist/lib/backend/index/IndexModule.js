"use strict";
const path = require('path');
const Application_1 = require("../viewer/Model/Application/Application");
const Helper_1 = require("../Helper");
class IndexModule {
    constructor(hostApp) {
        this.hostApp = hostApp;
    }
    async init() {
        this.css = (await Helper_1.Helper.getFilePaths(path.join(this.hostApp.getFrontendDirPath(), 'index'), 'css')).map(path => `/index/${path}`);
        this.js = (await Helper_1.Helper.getFilePaths(path.join(this.hostApp.getFrontendDirPath(), 'index'), 'js')).map(path => `/index/${path}`);
        // console.log('app.css:', this.css);
        // console.log('app.js:' , this.js);
    }
    async fill() {
        const appInfos = await Application_1.Application.getAppInfos(this.hostApp.appsDirPath);
        // console.log('appInfos:', appInfos);
        return {
            nodeEnv: this.hostApp.getNodeEnv(),
            appInfos: appInfos.map(appInfo => ({
                fullName: appInfo.fullName,
                envs: appInfo.envs
            }))
        };
    }
    getLinks() {
        return [
            ...(this.hostApp.commonModule.css),
            ...(this.css)
        ];
    }
    getScripts() {
        return [
            // '/lib/react/react.development.js',
            // '/lib/react/react-dom.development.js',
            '/lib/react/react.production.min.js',
            '/lib/react/react-dom.production.min.js',
            ...(this.hostApp.commonModule.js),
            ...(this.js)
        ];
    }
}
module.exports = IndexModule;
