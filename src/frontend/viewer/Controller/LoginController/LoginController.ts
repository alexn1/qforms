import { Controller } from '../Controller';
import { LoginView } from './LoginView';
import { Helper } from '../../../common';

export class LoginController extends Controller {
    frontHostApp: any;

    constructor(frontHostApp) {
        super();
        console.debug(`${this.constructor.name}.constructor`);
        this.frontHostApp = frontHostApp;
    }

    static create(frontHostApp): LoginController {
        const data = frontHostApp.getData();
        if (!data.name) throw new Error('no app name');
        const CustomClass = Helper.getGlobalClass(
            `${data.name}LoginController`,
        ) as typeof LoginController;
        const Class = CustomClass || LoginController;
        return new Class(frontHostApp);
    }

    getViewClass() {
        return LoginView;
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

declare global {
    interface Window {
        LoginController: typeof LoginController;
    }
}
