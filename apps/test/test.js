class testController extends ApplicationController {

    constructor(...args) {
        console.log('testController.constructor');
        super(...args);
    }

    init() {
        super.init();
    }

    deinit() {
        super.deinit();
    }
}
testController;