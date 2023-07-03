"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginFrontHostApp = void 0;
const LoginController_1 = require("./Controller/LoginController/LoginController");
const common_1 = require("../common");
class LoginFrontHostApp extends common_1.FrontHostApp {
    constructor(data) {
        console.debug('LoginFrontHostApp.constructor', data);
        super();
        this.data = data;
    }
    async run() {
        console.debug('LoginFrontHostApp.run');
        const loginController = LoginController_1.LoginController.create(this);
        const rootElement = document.querySelector(`.${loginController.getViewClassCssBlockName()}__root`);
        if (!rootElement)
            throw new Error('no root element');
        const loginView = common_1.Helper.createReactComponent(rootElement, loginController.getViewClass(), {
            ctrl: loginController,
        });
    }
    getText() {
        return this.data.text;
    }
    getData() {
        return this.data;
    }
}
exports.LoginFrontHostApp = LoginFrontHostApp;
common_1.Helper.registerGlobalClass(LoginFrontHostApp);
