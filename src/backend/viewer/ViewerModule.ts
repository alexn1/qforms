import Context from "../Context";

const path = require('path');
const pkg     = require('../../../package.json');

import Helper from "../Helper";
import BackHostApp from '../BackHostApp';
import Application from "./Model/Application/Application";
import MyError from "../MyError";

// post actions
const ACTIONS = [
    'page',
    'select',       // select
    'insert',       // insert
    'update',       // update
    '_delete',      // delete
    'rpc',
    'logout',
    'test',
];

class ViewerModule {
    backHostApp: BackHostApp;
    css: string[];
    js : string[];
    constructor(backHostApp: BackHostApp) {
        this.backHostApp = backHostApp;
    }
    async init() {
        this.css = (await Helper.getFilePaths(path.join(this.backHostApp.getFrontendDirPath(), 'viewer'), 'css')).map(path => `/viewer/${path}`);
        this.js  = (await Helper.getFilePaths(path.join(this.backHostApp.getFrontendDirPath(), 'viewer'), 'js' )).map(path => `/viewer/${path}`);
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
    async handleViewerGet(req, res, context: Context, application: Application) {
        console.log('BackHostApp.handleViewerGet', context.query/*, Object.keys(context.query).map(name => typeof context.query[name])*/);
        // const application = this.getApplication(context);
        if (application.isAuthentication() && !(req.session.user && req.session.user[context.getRoute()])) {
            await this.loginGet(req, res, context, application);
        } else {
            await application.connect(context);
            try {
                await application.initContext(context);
                const response =  await application.fill(context);
                res.render('viewer/index', {
                    version       : pkg.version,
                    application   : application,
                    context       : context,
                    response      : response,
                    links         : [
                        ...this.getLinks(),
                        ...application.links
                    ],
                    scripts       : [
                        ...this.getScripts(),
                        ...application.scripts
                    ]
                });
            } finally {
                application.release(context);
            }
        }
    }
    async loginGet(req, res, context: Context, application: Application) {
        console.log('BackHostApp.loginGet');
        // const application = this.getApplication(context);
        // const users = await application.getUsers(context);
        res.render('viewer/login', {
            version    : pkg.version,
            context    : context,
            application: application,
            links         : [
                ...this.getLinks(),
                ...application.links
            ],
            scripts       : [
                ...this.getScripts(),
                ...application.scripts
            ],
            data: {
                name  : application.getName(),
                text  : application.getText(),
                title : application.getTitle(context),
                errMsg: null,
            }
        });
    }
    async handleViewerPost(req, res, context: Context, application: Application) {
        // console.log('BackHostApp.handleViewerPost');
        if (req.body.action === 'login') {
            await this.loginPost(req, res, context, application);
        } else {
            if (application.isAuthentication() && !(req.session.user && req.session.user[context.getRoute()])) {
                throw new MyError({message: 'Unauthorized', status: 401, context});
            }
            if (ACTIONS.indexOf(req.body.action) === -1) {
                throw new Error(`unknown action: ${req.body.action}`);
            }
            return await this.backHostApp[req.body.action](req, res, context, application);
        }
    }
    async loginPost(req, res, context: Context, application: Application): Promise<void> {
        console.log('BackHostApp.loginPost');
        if (req.body.tzOffset === undefined) throw new Error('no tzOffset');
        if (req.body.username === undefined) throw new Error('no username');
        if (req.body.password === undefined) throw new Error('no password');
        // const application = this.getApplication(context);
        await application.connect(context);
        try {
            const user = await application.authenticate(context, req.body.username, req.body.password);
            if (user) {
                if (!user.id)   throw new Error('no user id');
                if (!user.name) throw new Error('no user name');
                if (req.session.user === undefined) {
                    req.session.user = {};
                }
                req.session.ip       = context.getIp();
                req.session.tzOffset = JSON.parse(req.body.tzOffset);
                req.session.user[context.getRoute()] = user;
                res.redirect(req.url);
            } else {
                // const users = await application.getUsers(context);
                res.render('viewer/login', {
                    version    : pkg.version,
                    context    : context,
                    application: application,
                    links         : [
                        ...this.getLinks(),
                        ...application.links
                    ],
                    scripts       : [
                        ...this.getScripts(),
                        ...application.scripts
                    ],
                    data: {
                        name  : application.getName(),
                        text  : application.getText(),
                        title : application.getTitle(context),
                        errMsg: application.getText().login.WrongUsernameOrPassword,
                        username: req.body.username,
                        password: req.body.password,
                    }
                });
            }
        } finally {
            application.release(context);
        }
    }

}
export = ViewerModule;
