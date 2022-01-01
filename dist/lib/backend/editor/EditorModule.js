"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const path = require('path');
const pkg = require('../../../package.json');
const Helper_1 = __importDefault(require("../Helper"));
const Application_1 = __importDefault(require("../viewer/Model/Application/Application"));
class EditorModule {
    constructor(backHostApp) {
        this.backHostApp = backHostApp;
    }
    async init() {
        this.css = (await Helper_1.default.getFilePaths(path.join(this.backHostApp.getFrontendDirPath(), 'editor'), 'css')).map(path => `/editor/${path}`);
        this.js = (await Helper_1.default.getFilePaths(path.join(this.backHostApp.getFrontendDirPath(), 'editor'), 'js')).map(path => `/editor/${path}`);
        // console.log('editor.css:', this.css);
        // console.log('editor.js:' , this.js);
    }
    getLinks() {
        return [
            '/lib/codemirror-4.8/lib/codemirror.css',
            '/lib/codemirror-4.8/theme/cobalt.css',
            ...(this.backHostApp.commonModule.css),
            ...(this.css)
        ];
    }
    getScripts() {
        return [
            // '/lib/react/react.development.js',
            // '/lib/react/react-dom.development.js',
            '/lib/react/react.production.min.js',
            '/lib/react/react-dom.production.min.js',
            '/lib/codemirror-4.8/lib/codemirror.js',
            '/lib/codemirror-4.8/mode/javascript/javascript.js',
            ...(this.backHostApp.commonModule.js),
            ...(this.js)
        ];
    }
    async handleEditorGet(req, res, context) {
        console.log('BackHostApp.handleEditorGet');
        const appInfo = await Application_1.default.loadAppInfo(this.backHostApp.getAppFilePath(context));
        // data
        const data = {
            app: appInfo.appFile.data,
            nodeEnv: this.backHostApp.getNodeEnv(),
            logErrorUrl: this.backHostApp.logErrorUrl
        };
        res.render('editor/index', {
            version: pkg.version,
            data: data,
            runAppLink: `/viewer/${context.getAppDirName()}/${context.getAppFileName()}/${context.getEnv()}/?debug=1`,
            appDirName: context.getAppDirName(),
            appFileName: context.getAppFileName(),
            env: context.getEnv(),
            links: this.getLinks(),
            scripts: this.getScripts()
        });
    }
}
module.exports = EditorModule;
