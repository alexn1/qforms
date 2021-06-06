const path = require('path');

import Application from '../viewer/Model/Application/Application';
import Helper from "../Helper";

class AppModule {
    backHostApp: any;
    css: string[];
    js : string[];
    constructor(backHostApp) {
        this.backHostApp = backHostApp;
    }
    async init() {
        this.css = (await Helper.getFilePaths(path.join(this.backHostApp.getPublicDirPath(), 'app'), 'css')).map(path => `/app/${path}`);
        this.js  = (await Helper.getFilePaths(path.join(this.backHostApp.getPublicDirPath(), 'app'), 'js' )).map(path => `/app/${path}`);
        // console.log('app.css:', this.css);
        // console.log('app.js:' , this.js);
    }
    async fill() {
        const appInfos = await Application.getAppInfos(this.backHostApp.appsDirPath);
        // console.log('appInfos:', appInfos);
        return {
            nodeEnv : this.backHostApp.nodeEnv,
            appInfos: appInfos.map(appInfo => ({
                fullName: appInfo.fullName,
                envs    : appInfo.envs
            }))
        };
    }
    getLinks() {
        return [
            ...(this.backHostApp.commonModule.css),
            ...(this.css)
        ];
    }
    getScripts() {
        return [
            '/lib/EventEmitter/EventEmitter.min.js',
            '/lib/react/react.development.js',
            '/lib/react/react-dom.development.js',
            ...(this.backHostApp.commonModule.js),
            ...(this.js)
        ];
    }
}
export = AppModule;
