class LoginController extends Controller {
    constructor(frontHostApp) {
        super();
        this.frontHostApp = frontHostApp;
    }
    getViewClass() {
        return LoginView;
    }
    getText() {
        return this.frontHostApp.getText();
    }
}
