class testController extends ApplicationController {

    constructor(...args) {
        console.log('testController.constructor');
        super(...args);
    }

    init() {
        super.init();
    }

    initMenu() {}
    initStatusbar() {}
    initTab() {}
    createPages() {}

    deinit() {
        super.deinit();
    }
}
testController;