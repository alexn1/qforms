"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginController = void 0;
const Controller_1 = require("../Controller");
const LoginView_1 = require("./LoginView");
const common_1 = require("../../../common");
class LoginController extends Controller_1.Controller {
    constructor(frontHostApp) {
        super();
        console.log(`${this.constructor.name}.constructor`);
        this.frontHostApp = frontHostApp;
    }
    static create(frontHostApp) {
        const data = frontHostApp.getData();
        if (!data.name)
            throw new Error('no app name');
        const CustomClass = common_1.Helper.getGlobalClass(`${data.name}LoginController`);
        const Class = CustomClass || LoginController;
        return new Class(frontHostApp);
    }
    getViewClass() {
        return LoginView_1.LoginView;
    }
    getText() {
        return this.frontHostApp.getText();
    }
    getFrontHostApp() {
        return this.frontHostApp;
    }
    getViewClassCssBlockName() {
        return this.getViewClass().name;
    }
}
exports.LoginController = LoginController;
if (typeof window === 'object') {
    window.LoginController = LoginController;
}
