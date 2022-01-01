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
            await this.loginGet(req, res, context, application);
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
    async loginGet(req, res, context, application) {
        console.log('BackHostApp.loginGet');
        // const application = this.getApplication(context);
        // const users = await application.getUsers(context);
        res.render('viewer/login', {
            version: pkg.version,
            context: context,
            application: application,
            links: [
                ...this.getLinks(),
                ...application.links
            ],
            scripts: [
                ...this.getScripts(),
                ...application.scripts
            ],
            data: {
                name: application.getName(),
                text: application.getText(),
                title: application.getTitle(context),
                errMsg: null,
            }
        });
    }
}
module.exports = ViewerModule;
