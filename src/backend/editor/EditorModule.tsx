import { Request, Response, NextFunction } from 'express';
import path from 'path';
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
import { EditorPostDto, Nullable } from '../../types';
import { getFilePaths } from '../file-helper';

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
            await getFilePaths(path.join(this.hostApp.getFrontendDirPath(), 'editor/public'), 'css')
        ).map((path: string) => `/editor/public/${path}`);

        this.js = (
            await getFilePaths(path.join(this.hostApp.getFrontendDirPath(), 'editor/public'), 'js')
        ).map((path: string) => `/editor/public/${path}`);
        // debug('editor.css:', this.css);
        // debug('editor.js:' , this.js);
    }

    getLinks(): string[] {
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

    async get(req: Request, res: Response, next: NextFunction): Promise<void> {
        let context: Nullable<Context> = null;
        try {
            context = new Context({
                req,
                res,
                domain: this.hostApp.getDomain(req),
            });
            await this.handleEditorGet(req, res, context);
        } catch (err) {
            next(err);
        } finally {
            if (context) {
                context.destroy();
            }
        }
    }

    async handleEditorGet(req: Request, res: Response, context: Context) {
        debug('EditorModule.handleEditorGet');
        const appInfo = await BkApplication.loadAppInfo(this.hostApp.getSrcAppFilePath(context));

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
        res.setHeader('Content-Type', 'text/html; charset=utf-8').end(html);
    }

    async post(req: Request, res: Response, next: NextFunction): Promise<void> {
        let context: Nullable<Context> = null;
        try {
            context = new Context({
                req,
                res,
                domain: this.hostApp.getDomain(req),
            });
            await this.handleEditorPost(req, res, context);
        } catch (err) {
            next(err);
        } finally {
            if (context) {
                context.destroy();
            }
        }
    }

    async handleEditorPost(req: Request, res: Response, context: Context) {
        debug('EditorModule.handleEditorPost', req.body);
        const body = req.body as EditorPostDto;
        if (EDITOR_CONTROLLERS.indexOf(body.controller) === -1) {
            throw new Error(`unknown controller: ${body.controller}`);
        }
        if (EDITOR_ACTIONS.indexOf(body.action) === -1) {
            throw new Error(`unknown action ${body.action}`);
        }
        const editorControllerClassName = `${body.controller}EditorController`;
        const ControllerClass = backend[editorControllerClassName];
        if (!ControllerClass) throw new Error(`no class with name ${editorControllerClassName}`);

        const appInfo = await BkApplication.loadAppInfo(this.hostApp.getSrcAppFilePath(context));
        const ctrl = new ControllerClass(appInfo, this.hostApp, null);
        await ctrl.init(context);
        const method = body.action;
        if (!ctrl[method]) throw new Error(`no method: ${editorControllerClassName}.${method}`);
        const result = await ctrl[method](context.getParams());
        // debug('json result:', result);
        if (result === undefined) throw new Error('handleEditorPost: result is undefined');
        res.json(result);
    }
}
