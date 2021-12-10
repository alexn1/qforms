class LoginFrontHostApp extends FrontHostApp {
    constructor(data) {
        console.log('LoginFrontHostApp.constructor', data);
        super();
        this.data = data;
    }
    async run() {
        console.log('LoginFrontHostApp.run');
        const loginController = LoginController.create(this);
        const ViewClass = loginController.getViewClass();
        const rootElement = document.querySelector(`.${ViewClass.name}__root`);
        const loginView = Helper.createReactComponent(rootElement, ViewClass, {ctrl: loginController});
    }
    getText() {
        return this.data.text;
    }
    getData() {
        return this.data;
    }
}
