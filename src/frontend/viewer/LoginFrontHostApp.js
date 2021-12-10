class LoginFrontHostApp extends FrontHostApp {
    constructor(data) {
        console.log('LoginFrontHostApp.constructor', data);
        super();
        this.data = data;
    }
    async run() {
        console.log('LoginFrontHostApp.run');
        const loginController = LoginController.create(this);
        const rootElement = document.querySelector(`.${loginController.getViewClassCssBlockName()}__root`);
        const loginView = Helper.createReactComponent(rootElement, loginController.getViewClass(), {ctrl: loginController});
    }
    getText() {
        return this.data.text;
    }
    getData() {
        return this.data;
    }
}
