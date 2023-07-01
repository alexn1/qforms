import { LoginController } from './Controller/LoginController/LoginController';
import { FrontHostApp, Helper } from '../common';

export class LoginFrontHostApp extends FrontHostApp {
    // data: any;

    constructor(private data) {
        console.log('LoginFrontHostApp.constructor', data);
        super();
    }

    async run() {
        console.log('LoginFrontHostApp.run');
        const loginController = LoginController.create(this);
        const rootElement = document.querySelector(
            `.${loginController.getViewClassCssBlockName()}__root`,
        );
        if (!rootElement) throw new Error('no root element');
        const loginView = Helper.createReactComponent(rootElement, loginController.getViewClass(), {
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

Helper.registerGlobalClass(LoginFrontHostApp);
