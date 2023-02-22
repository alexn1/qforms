import path from 'path';

import { Context } from '../Context';
import { BackHostApp } from '../BackHostApp';
import { Helper } from '../Helper';
import { BkApplication } from '../viewer/BkModel/BkApplication/BkApplication';
import ReactDOMServer from 'react-dom/server';
import { Links } from '../Links';
import { Scripts } from '../Scripts';
import * as backend from '../index';

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
            await Helper.getFilePaths(
                path.join(this.hostApp.getFrontendDirPath(), 'editor/public'),
                'css',
            )
        ).map((path) => `/editor/public/${path}`);
        this.js = (
            await Helper.getFilePaths(
                path.join(this.hostApp.getFrontendDirPath(), 'editor/public'),
                'js',
            )
        ).map((path) => `/editor/public/${path}`);
        // console.log('editor.css:', this.css);
        // console.log('editor.js:' , this.js);
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
        console.log('EditorModule.handleEditorGet');
        const appInfo = await BkApplication.loadAppInfo(this.hostApp.getAppFilePath(context), null);

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
        const html = this.render(
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

    render(version, data, runAppLink, appDirName, appFileName, env, links, scripts) {
        return `<!DOCTYPE html>
<html class="editor" lang="en">
<head>
    <!-- ${version} -->
    <meta charset="utf-8">
    <title>${appDirName}/${appFileName}[${env}] - QForms Editor</title>
    <!-- links -->
    ${links}
    <!-- scripts -->
    ${scripts}
    <!--<script type="text/javascript">
        document.addEventListener('DOMContentLoaded', async () => {
            console.log('editor.ejs DOMContentLoaded');
            const data = JSON.parse(document.querySelector('script[type="application/json"]').textContent);
            const runAppLink = "${runAppLink}";
            const editorFrontHostApp = new EditorFrontHostApp(data, runAppLink);
            await editorFrontHostApp.run();
        });
    </script>-->
    <script type="application/json">${JSON.stringify(data /*, null, 4*/)}</script>
</head>
<body class="editor__body">
    <div class="editor__root"></div>
</body>
</html>
`;
    }

    async handleEditorPost(req, res, context: Context) {
        console.log('EditorModule.handleEditorPost', req.body);
        if (EDITOR_CONTROLLERS.indexOf(req.body.controller) === -1) {
            throw new Error(`unknown controller: ${req.body.controller}`);
        }
        if (EDITOR_ACTIONS.indexOf(req.body.action) === -1) {
            throw new Error(`unknown action ${req.body.action}`);
        }
        const editorControllerClassName = `${req.body.controller}EditorController`;
        const ControllerClass = backend[editorControllerClassName];
        if (!ControllerClass) throw new Error(`no class with name ${editorControllerClassName}`);

        const appInfo = await BkApplication.loadAppInfo(this.hostApp.getAppFilePath(context), null);
        const ctrl = new ControllerClass(appInfo, this.hostApp, null);
        await ctrl.init(context);
        const method = req.body.action;
        if (!ctrl[method]) throw new Error(`no method: ${editorControllerClassName}.${method}`);
        const result = await ctrl[method](context.params);
        // console.log('json result:', result);
        if (result === undefined) throw new Error('handleEditorPost: result is undefined');
        await res.json(result);
    }
}
