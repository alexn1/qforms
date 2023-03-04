"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexFrontHostApp = void 0;
const IndexView_1 = require("./IndexView/IndexView");
const common_1 = require("../common");
class IndexFrontHostApp {
    constructor(data) {
        this.onAppChange = (fullName) => {
            console.log('IndexFrontHostApp.onAppChange', fullName);
            this.currentAppFullName = fullName;
            const appInfo = this.data.appInfos.find((app) => app.fullName === fullName);
            if (!appInfo)
                throw new Error(`no appInfo ${fullName}`);
            // console.log('appInfo:', appInfo);
            this.currentAppEnv = appInfo.envs[0];
            this.view.rerender();
        };
        this.onEnvChange = (env) => {
            console.log('IndexFrontHostApp.onEnvChange', env);
            this.currentAppEnv = env;
        };
        this.run = (e) => {
            if (this.currentAppFullName) {
                const href = `viewer/${this.currentAppFullName}/${this.currentAppEnv}/domain/`;
                console.log('href:', href);
                window.location.href = href;
            }
        };
        this.edit = (e) => {
            if (this.currentAppFullName) {
                const href = `editor/${this.currentAppFullName}/${this.currentAppEnv}/domain/`;
                console.log('href:', href);
                window.location.href = href;
            }
        };
        this.btnCreate_Click = async (e) => {
            this.modals.push({ id: 1 });
            await this.view.rerender();
            this.folderNameTextBox.getElement().focus();
        };
        this.closeModal = () => {
            console.log('IndexFrontHostApp.closeModal');
            this.modals.pop();
            this.view.rerender();
        };
        this.onFolderNameCreate = (textBox) => {
            console.log('IndexFrontHostApp.onFolderNameCreate');
            this.folderNameTextBox = textBox;
        };
        this.onFolderNameChange = (folderName) => {
            // console.log('IndexFrontHostApp.onFolderNameChange', folderName);
            this.folderName = folderName;
        };
        this.onAppNameChange = (appName) => {
            this.appName = appName;
        };
        this.onCreateClick = async (e) => {
            console.log('IndexFrontHostApp.onCreateClick');
            console.log(this.folderName, this.appName);
            this.closeModal();
            await this.createApp(this.folderName, this.appName);
        };
        console.log('IndexFrontHostApp.constructor', data);
        this.data = data;
        this.view = null;
        this.currentAppFullName = undefined;
        this.currentAppEnv = undefined;
        this.modals = [];
        this.folderNameTextBox = null;
        this.folderName = null;
        this.appName = null;
    }
    init() {
        // console.log('IndexFrontHostApp.init');
        const appInfo = this.data.appInfos[0];
        this.currentAppFullName = appInfo ? appInfo.fullName : undefined;
        this.currentAppEnv = appInfo && appInfo.envs[0] ? appInfo.envs[0] : undefined;
        this.createView(document.querySelector('#root'));
    }
    createView(root) {
        this.view = common_1.Helper.createReactComponent(root, IndexView_1.IndexView, {
            ctrl: this,
        });
    }
    getAppItems() {
        return this.data.appInfos.map((appInfo) => ({
            value: appInfo.fullName,
            title: appInfo.fullName,
        }));
    }
    getEnvItems() {
        // console.log('IndexFrontHostApp.getEnvItems', this.currentAppFullName);
        if (this.currentAppFullName) {
            const appInfo = this.getAppInfo(this.currentAppFullName);
            if (appInfo) {
                return appInfo.envs.map((env) => ({ value: env, title: env }));
            }
        }
        return [];
    }
    getAppInfo(fullName) {
        // console.log('IndexFrontHostApp.getAppInfo', fullName);
        return this.data.appInfos.find((appInfo) => appInfo.fullName === fullName);
    }
    async createApp(folderName, appName) {
        const data = await common_1.FrontHostApp.doHttpRequest({
            action: 'new',
            folder: folderName,
            name: appName,
        });
        console.log('data:', data);
        if (data.appInfos) {
            this.data.appInfos = data.appInfos;
            this.currentAppFullName = `${folderName}/${appName}`;
            this.view.rerender();
        }
    }
}
exports.IndexFrontHostApp = IndexFrontHostApp;
