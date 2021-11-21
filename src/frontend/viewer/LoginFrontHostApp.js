class LoginFrontHostApp extends FrontHostApp {
    async run() {
        console.log('LoginFrontHostApp.run');
        const rootElement = document.querySelector('.login__root');
        const loginController = new LoginController();
        const loginView = Helper.createReactComponent(rootElement, loginController.getViewClass(), {ctrl: loginController});
    }
}
