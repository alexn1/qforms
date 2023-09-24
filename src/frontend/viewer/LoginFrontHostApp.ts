import { LoginController } from './Controller/LoginController/LoginController';
import { FrontHostApp, ReactHelper } from '../common';
import { Helper } from '../../common';

export class LoginFrontHostApp extends FrontHostApp {
    constructor(private data) {
        console.debug('LoginFrontHostApp.constructor', data);
        super();
    }

    async run() {
        console.debug('LoginFrontHostApp.run');
        const loginController = LoginController.create(this);
        const rootElement = document.querySelector(
            `.${loginController.getViewClassCssBlockName()}__root`,
        );
        if (!rootElement) throw new Error('no root element');
        const loginView = ReactHelper.createReactComponent(
            rootElement,
            loginController.getViewClass(),
            {
                ctrl: loginController,
            },
        );
    }

    getText() {
        return this.data.text;
    }

    getData() {
        return this.data;
    }
}

Helper.registerGlobalClass(LoginFrontHostApp);
