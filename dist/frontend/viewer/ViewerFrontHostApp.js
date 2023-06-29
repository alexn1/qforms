"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewerFrontHostApp = void 0;
const react_dom_1 = __importDefault(require("react-dom"));
const Application_1 = require("./Model/Application/Application");
const ApplicationController_1 = require("./Controller/ModelController/ApplicationController/ApplicationController");
const common_1 = require("../common");
const AlertController_1 = require("./Controller/AlertController/AlertController");
const ConfirmController_1 = require("./Controller/ConfirmController/ConfirmController");
// style
require("./style/application.less");
require("./style/field.less");
require("./style/form.less");
require("./style/page.less");
require("./style/paging.less");
require("./style/toolbar-button.less");
require("./style/toolbar-dropdown-button.less");
require("./style/version-notification.less");
// common style
require("../common/style/ellipsis.less");
require("../common/style/flex.less");
require("../common/style/flex-column.less");
require("../common/style/flex-max.less");
require("../common/style/frame.less");
require("../common/style/full.less");
require("../common/style/global.less");
require("../common/style/grid-gap-5.less");
require("../common/style/grid-gap-10.less");
require("../common/style/wait.less");
class ViewerFrontHostApp extends common_1.FrontHostApp {
    constructor(options) {
        if (!options.data)
            throw new Error('ViewerFrontHostApp: no data');
        super(options);
        this.options = options;
        this.applicationController = null;
    }
    async run() {
        console.log('ViewerFrontHostApp.run', this.getData());
        // application
        const application = new Application_1.Application(this.getData());
        application.init();
        // applicationController
        const applicationController = (this.applicationController = ApplicationController_1.ApplicationController.create(application, this));
        applicationController.init();
        // view
        const rootElementName = `.${applicationController.getViewClass().name}__root`;
        const rootElement = document.querySelector(rootElementName);
        if (!rootElement) {
            throw new Error(`no root element: ${rootElementName}`);
        }
        applicationController.createView(rootElement);
        // connect
        try {
            await applicationController.connect();
        }
        catch (err) {
            this.logError(err);
        }
    }
    async onWindowPopState(e) {
        // console.log('ViewerFrontHostApp.onWindowPopState', e.state);
        await this.applicationController.onWindowPopState(e);
    }
    logError(err) {
        console.error('FrontHostApp.logError', err);
        const body = {
            type: 'error',
            source: 'client',
            message: err.message,
            stack: err.stack,
            data: JSON.stringify({
                href: window.location.href,
                platformVersion: this.getData().versions.platform,
                appVersion: this.getData().versions.app,
            }, null, 4),
        };
        console.log(`POST ${this.getData().logErrorUrl}`, body);
        fetch(this.getData().logErrorUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify(body),
        }).catch((err) => {
            console.error(err.message);
        });
    }
    getData() {
        if (!this.options.data)
            throw new Error('no data');
        return this.options.data;
    }
    alert(options) {
        console.log('ViewerFrontHostApp.alert', options);
        return new Promise((resolve, reject) => {
            try {
                const root = document.querySelector('.alert-root');
                if (!root)
                    throw new Error('no .alert-root');
                if (root.childElementCount === 0) {
                    const ctrl = (this.alertCtrl = new AlertController_1.AlertController(Object.assign(Object.assign({}, options), { onClose: () => {
                            this.alertCtrl = null;
                            react_dom_1.default.unmountComponentAtNode(root);
                            resolve();
                        } })));
                    // console.log('ctrl:', ctrl);
                    const view = common_1.Helper.createReactComponent(root, ctrl.getViewClass(), {
                        ctrl,
                        key: 0,
                    });
                    // console.log('view', view);
                }
                else {
                    reject(new Error('alert already exists'));
                }
            }
            catch (err) {
                reject(err);
            }
        });
    }
    confirm(options) {
        console.log('ViewerFrontHostApp.confirm', options);
        return new Promise((resolve, reject) => {
            try {
                const root = document.querySelector('.alert-root');
                if (!root)
                    throw new Error('no .alert-root');
                if (root.childElementCount === 0) {
                    const ctrl = (this.alertCtrl = new ConfirmController_1.ConfirmController(Object.assign(Object.assign({}, options), { onClose: (result) => {
                            this.alertCtrl = null;
                            react_dom_1.default.unmountComponentAtNode(root);
                            resolve(result);
                        } })));
                    // console.log('ctrl:', ctrl);
                    const view = common_1.Helper.createReactComponent(root, ctrl.getViewClass(), { ctrl });
                    // console.log('view', view);
                }
                else {
                    reject(new Error('confirm already exists'));
                }
            }
            catch (err) {
                reject(err);
            }
        });
    }
}
exports.ViewerFrontHostApp = ViewerFrontHostApp;
common_1.Helper.registerGlobalClass(ViewerFrontHostApp);
