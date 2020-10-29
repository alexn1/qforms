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
    onButtonClick = e => {
        console.log('testController.onButtonClick');
        document.querySelector('html').classList.add('wait');
    }
}
testController;
