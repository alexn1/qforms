import path from 'path';
import { Request, Response } from 'express';
import ReactDOMServer from 'react-dom/server';

import { Context } from '../Context';
import { BackHostApp } from '../BackHostApp';
import { BkHelper } from '../BkHelper';
import { BkApplication } from '../viewer/BkModel/BkApplication/BkApplication';
import { Links } from '../Links';
import { Scripts } from '../Scripts';
import * as backend from '../index';
import { home } from './home';
import { debug } from '../../console';

const pkg = require('../../../package.json');

const EDITOR_CONTROLLERS = [
    'Application',
    'Database',
    'Param',
    'Table',
    'Column',
    'DataSource',
    'KeyColumn',
    'Page',
    'PageLink',
    'Form',
    'Field',
    'Action',
];

const EDITOR_ACTIONS = [
    'save',
    '_new',
    'delete',
    'getView',
    'saveView',
    'saveController',
    'createView',
    'createStyle',
    'createController',
    'get',
    'getTableInfo',
    'changeClass',
    'moveUp',
    'moveDown',
    'createModelBackJs',
];

export class EditorModule {
    hostApp: BackHostApp;
    css: string[];
    js: string[];

    constructor(hostApp: BackHostApp) {
        this.hostApp = hostApp;
    }

    async init() {
        this.css = (
            await BkHelper.getFilePaths(
                path.join(this.hostApp.getFrontendDirPath(), 'editor/public'),
                'css',
            )
        ).map((path) => `/editor/public/${path}`);
        this.js = (
            await BkHelper.getFilePaths(
                path.join(this.hostApp.getFrontendDirPath(), 'editor/public'),
                'js',
            )
        ).map((path) => `/editor/public/${path}`);
        // debug('editor.css:', this.css);
        // debug('editor.js:' , this.js);
    }

    getLinks() {
        return [
            '/lib/codemirror-4.8/lib/codemirror.css',
            '/lib/codemirror-4.8/theme/cobalt.css',
            ...this.css,
        ];
    }

    getScripts() {
        return [
            '/lib/codemirror-4.8/lib/codemirror.js',
            '/lib/codemirror-4.8/mode/javascript/javascript.js',
            ...this.js,
        ];
    }

    async handleEditorGet(req, res, context: Context) {
        debug('EditorModule.handleEditorGet');
        const appInfo = await BkApplication.loadAppInfo(this.hostApp.getAppFilePath(context));

        // data
        const data = {
            app: appInfo.appFile.data,
            nodeEnv: this.hostApp.getNodeEnv(),
            logErrorUrl: '/error',
        };
        const links = ReactDOMServer.renderToStaticMarkup(<Links links={this.getLinks()} />);
        const scripts = ReactDOMServer.renderToStaticMarkup(
            <Scripts scripts={this.getScripts()} />,
        );
        const html = home(
            pkg.version,
            {
                ...data,
                runAppLink: `/viewer/${context.getAppDirName()}/${context.getAppFileName()}/${context.getEnv()}/${context.getDomain()}/?debug=1`,
            },
            `/viewer/${context.getAppDirName()}/${context.getAppFileName()}/${context.getEnv()}/${context.getDomain()}/?debug=1`,
            context.getAppDirName(),
            context.getAppFileName(),
            context.getEnv(),
            links,
            scripts,
        );
        res.end(html);
    }

    async handleEditorPost(req: Request, res: Response, context: Context) {
        debug('EditorModule.handleEditorPost', req.body);
        if (EDITOR_CONTROLLERS.indexOf(req.body!.controller) === -1) {
            throw new Error(`unknown controller: ${req.body.controller}`);
        }
        if (EDITOR_ACTIONS.indexOf(req.body!.action) === -1) {
            throw new Error(`unknown action ${req.body!.action}`);
        }
        const editorControllerClassName = `${req.body!.controller}EditorController`;
        const ControllerClass = backend[editorControllerClassName];
        if (!ControllerClass) throw new Error(`no class with name ${editorControllerClassName}`);

        const appInfo = await BkApplication.loadAppInfo(this.hostApp.getAppFilePath(context));
        const ctrl = new ControllerClass(appInfo, this.hostApp, null);
        await ctrl.init(context);
        const method = req.body!.action;
        if (!ctrl[method]) throw new Error(`no method: ${editorControllerClassName}.${method}`);
        const result = await ctrl[method](context.params);
        // debug('json result:', result);
        if (result === undefined) throw new Error('handleEditorPost: result is undefined');
        res.json(result);
    }
}
