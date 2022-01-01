"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const path = require('path');
const pkg = require('../../../package.json');
const Helper_1 = __importDefault(require("../Helper"));
class ViewerModule {
    constructor(backHostApp) {
        this.backHostApp = backHostApp;
    }
    async init() {
        this.css = (await Helper_1.default.getFilePaths(path.join(this.backHostApp.getFrontendDirPath(), 'viewer'), 'css')).map(path => `/viewer/${path}`);
        this.js = (await Helper_1.default.getFilePaths(path.join(this.backHostApp.getFrontendDirPath(), 'viewer'), 'js')).map(path => `/viewer/${path}`);
        // console.log('viewer.css:', this.css);
        // console.log('viewer.js:' , this.js);
    }
    getLinks() {
        return [
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
            ...(this.backHostApp.commonModule.js),
            ...(this.js)
        ];
    }
    async handleViewerGet(req, res, context, application) {
        console.log('BackHostApp.handleViewerGet', context.query /*, Object.keys(context.query).map(name => typeof context.query[name])*/);
        // const application = this.getApplication(context);
        if (application.isAuthentication() && !(req.session.user && req.session.user[context.getRoute()])) {
            await this.backHostApp.loginGet(req, res, context);
        }
        else {
            await application.connect(context);
            try {
                await application.initContext(context);
                const response = await application.fill(context);
                res.render('viewer/index', {
                    version: pkg.version,
                    application: application,
                    context: context,
                    response: response,
                    links: [
                        ...this.getLinks(),
                        ...application.links
                    ],
                    scripts: [
                        ...this.getScripts(),
                        ...application.scripts
                    ]
                });
            }
            finally {
                application.release(context);
            }
        }
    }
}
module.exports = ViewerModule;
