"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditorModule = void 0;
const path = require('path');
const pkg = require('../../../package.json');
const Helper_1 = require("../Helper");
const BkApplication_1 = require("../viewer/BkModel/BkApplication/BkApplication");
const backend = __importStar(require("../index"));
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
class EditorModule {
    constructor(hostApp) {
        this.hostApp = hostApp;
    }
    async init() {
        this.css = (await Helper_1.Helper.getFilePaths(path.join(this.hostApp.getFrontendDirPath(), 'editor/public'), 'css')).map((path) => `/editor/public/${path}`);
        this.js = (await Helper_1.Helper.getFilePaths(path.join(this.hostApp.getFrontendDirPath(), 'editor/public'), 'js')).map((path) => `/editor/public/${path}`);
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
    async handleEditorGet(req, res, context) {
        console.log('EditorModule.handleEditorGet');
        const appInfo = await BkApplication_1.BkApplication.loadAppInfo(this.hostApp.getAppFilePath(context), null);
        // data
        const data = {
            app: appInfo.appFile.data,
            nodeEnv: this.hostApp.getNodeEnv(),
            logErrorUrl: '/error',
        };
        res.render('editor/index', {
            version: pkg.version,
            data: Object.assign(Object.assign({}, data), { runAppLink: `/viewer/${context.getAppDirName()}/${context.getAppFileName()}/${context.getEnv()}/${context.getDomain()}/?debug=1` }),
            runAppLink: `/viewer/${context.getAppDirName()}/${context.getAppFileName()}/${context.getEnv()}/${context.getDomain()}/?debug=1`,
            appDirName: context.getAppDirName(),
            appFileName: context.getAppFileName(),
            env: context.getEnv(),
            links: this.getLinks(),
            scripts: this.getScripts(),
        });
    }
    async handleEditorPost(req, res, context) {
        console.log('EditorModule.handleEditorPost', req.body);
        if (EDITOR_CONTROLLERS.indexOf(req.body.controller) === -1) {
            throw new Error(`unknown controller: ${req.body.controller}`);
        }
        if (EDITOR_ACTIONS.indexOf(req.body.action) === -1) {
            throw new Error(`unknown action ${req.body.action}`);
        }
        const editorControllerClassName = `${req.body.controller}EditorController`;
        const ControllerClass = backend[editorControllerClassName];
        if (!ControllerClass)
            throw new Error(`no class with name ${editorControllerClassName}`);
        const appInfo = await BkApplication_1.BkApplication.loadAppInfo(this.hostApp.getAppFilePath(context), null);
        const ctrl = new ControllerClass(appInfo, this.hostApp, null);
        await ctrl.init(context);
        const method = req.body.action;
        if (!ctrl[method])
            throw new Error(`no method: ${editorControllerClassName}.${method}`);
        const result = await ctrl[method](context.params);
        // console.log('json result:', result);
        if (result === undefined)
            throw new Error('handleEditorPost: result is undefined');
        await res.json(result);
    }
}
exports.EditorModule = EditorModule;
