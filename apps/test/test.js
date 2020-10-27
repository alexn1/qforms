'use strict';
class testController extends ApplicationController {
    /*constructor(...args) {
        console.log('testController.constructor');
        super(...args);
    }*/
    /*init() {
        console.log('testController.init');
        super.init();
    }*/
    /*deinit() {
        super.deinit();
    }*/
    getViewClass() {
        return testView;
    }
}
testController;
