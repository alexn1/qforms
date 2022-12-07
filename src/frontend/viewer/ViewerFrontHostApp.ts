import ReactDOM from 'react-dom';
import { Application } from './Model/Application/Application';
import { ApplicationController } from './Controller/ModelController/ApplicationController/ApplicationController';
import { FrontHostApp, Helper } from '../common';
import { AlertController } from './Controller/AlertController/AlertController';
import { ConfirmController } from './Controller/ConfirmController/ConfirmController';

export class ViewerFrontHostApp extends FrontHostApp {
    options: any;
    applicationController: any;
    constructor(options: any = {}) {
        if (!options.data) throw new Error('no data');
        super();
        this.options = options;
        this.applicationController = null;
    }
    async run() {
        console.log('ViewerFrontHostApp.run', this.getData());

        // application
        const application = new Application(this.getData());
        application.init();

        // applicationController
        const applicationController = (this.applicationController = ApplicationController.create(
            application,
            this,
        ));
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
        } catch (err) {
            this.logError(err);
        }
    }
    async onWindowPopState(e) {
        // console.log('ViewerFrontHostApp.onWindowPopState', e.state);
        await this.applicationController.onWindowPopState(e);
    }
    logError(err) {
        console.error('FrontHostApp.logError', err);
        const values = {
            type: 'error',
            source: 'client',
            message: err.message,
            stack: err.stack,
            data: {
                href: window.location.href,
                platformVersion: this.getData().versions.platform,
                appVersion: this.getData().versions.app,
            },
        };
        console.log(`POST ${this.getData().logErrorUrl}`, values);
        fetch(this.getData().logErrorUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify(values),
        }).catch(err => {
            console.error(err.message);
        });
    }
    getData() {
        if (!this.options.data) throw new Error('no data');
        return this.options.data;
    }
    alert(options) {
        console.log('ViewerFrontHostApp.alert', options);
        return new Promise((resolve, reject) => {
            try {
                const root = document.querySelector('.alert-root');
                if (root.childElementCount === 0) {
                    const ctrl = (this.alertCtrl = new AlertController({
                        ...options,
                        onClose: result => {
                            this.alertCtrl = null;
                            ReactDOM.unmountComponentAtNode(root);
                            resolve(result);
                        },
                    }));
                    // console.log('ctrl:', ctrl);
                    const view = Helper.createReactComponent(root, ctrl.getViewClass(), { ctrl });
                    // console.log('view', view);
                } else {
                    reject(new Error('alert already exists'));
                }
            } catch (err) {
                reject(err);
            }
        });
    }
    confirm(options) {
        console.log('ViewerFrontHostApp.confirm', options);
        return new Promise((resolve, reject) => {
            try {
                const root = document.querySelector('.alert-root');
                if (root.childElementCount === 0) {
                    const ctrl = (this.alertCtrl = new ConfirmController({
                        ...options,
                        onClose: result => {
                            this.alertCtrl = null;
                            ReactDOM.unmountComponentAtNode(root);
                            resolve(result);
                        },
                    }));
                    // console.log('ctrl:', ctrl);
                    const view = Helper.createReactComponent(root, ctrl.getViewClass(), { ctrl });
                    // console.log('view', view);
                } else {
                    reject(new Error('confirm already exists'));
                }
            } catch (err) {
                reject(err);
            }
        });
    }
}

// @ts-ignore
window.ViewerFrontHostApp = ViewerFrontHostApp;
