import ReactDOM from 'react-dom';

import { Application } from './Model/Application/Application';
import { ApplicationController } from './Controller/ModelController/ApplicationController/ApplicationController';
import { FrontHostApp, Helper, FrontHostAppOptions } from '../common';
import { AlertController } from './Controller/AlertController/AlertController';
import { ConfirmController } from './Controller/ConfirmController/ConfirmController';
import { ApplicationData } from '../../data';

// style
import './style/application.less';
import './style/field.less';
import './style/form.less';
import './style/page.less';
import './style/paging.less';
import './style/toolbar-button.less';
import './style/toolbar-dropdown-button.less';
import './style/version-notification.less';

// common style
import '../common/style/ellipsis.less';
import '../common/style/flex.less';
import '../common/style/flex-column.less';
import '../common/style/flex-max.less';
import '../common/style/frame.less';
import '../common/style/full.less';
import '../common/style/global.less';
import '../common/style/grid-gap-5.less';
import '../common/style/grid-gap-10.less';
import '../common/style/wait.less';

export interface ViewerFrontHostAppOptions extends FrontHostAppOptions {
    data: ApplicationData;
}

export class ViewerFrontHostApp extends FrontHostApp {
    applicationController: ApplicationController | null = null;

    constructor(protected options: ViewerFrontHostAppOptions) {
        if (!options.data) throw new Error('ViewerFrontHostApp: no data');
        super(options);
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
        await this.applicationController!.onWindowPopState(e);
    }

    logError(err: Error) {
        console.error('FrontHostApp.logError', err);
        const body = {
            type: 'error',
            source: 'client',
            message: err.message,
            stack: err.stack,
            data: JSON.stringify(
                {
                    href: window.location.href,
                    platformVersion: this.getData().versions.platform,
                    appVersion: this.getData().versions.app,
                },
                null,
                4,
            ),
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

    getData(): ApplicationData {
        if (!this.options.data) throw new Error('no data');
        return this.options.data;
    }

    alert(options: { message: string; title?: string }): Promise<void> {
        console.log('ViewerFrontHostApp.alert', options);
        return new Promise((resolve, reject) => {
            try {
                const root = document.querySelector('.alert-root');
                if (!root) throw new Error('no .alert-root');
                if (root.childElementCount === 0) {
                    const ctrl = (this.alertCtrl = new AlertController({
                        ...options,
                        onClose: () => {
                            this.alertCtrl = null;
                            ReactDOM.unmountComponentAtNode(root);
                            resolve();
                        },
                    }));
                    // console.log('ctrl:', ctrl);
                    const view = Helper.createReactComponent(root, ctrl.getViewClass(), {
                        ctrl,
                        key: 0,
                    });
                    // console.log('view', view);
                } else {
                    reject(new Error('alert already exists'));
                }
            } catch (err) {
                reject(err);
            }
        });
    }

    confirm(options: {
        message: string;
        title?: string;
        yesButton?: string;
        noButton?: string;
    }): Promise<boolean> {
        console.log('ViewerFrontHostApp.confirm', options);
        return new Promise((resolve, reject) => {
            try {
                const root = document.querySelector('.alert-root');
                if (!root) throw new Error('no .alert-root');
                if (root.childElementCount === 0) {
                    const ctrl = (this.alertCtrl = new ConfirmController({
                        ...options,
                        onClose: (result: boolean) => {
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

Helper.registerGlobalClass(ViewerFrontHostApp);
