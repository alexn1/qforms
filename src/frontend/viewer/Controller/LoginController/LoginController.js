class LoginController extends Controller {
    constructor(frontHostApp) {
        super();
        console.log(`${this.constructor.name}.constructor`);
        this.frontHostApp = frontHostApp;
    }
    static create(frontHostApp) {
        const data = frontHostApp.getData();
        const CustomClass = FrontHostApp.getClassByName(`${data.name}LoginController`);
        const Class = CustomClass ? CustomClass : LoginController;
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
