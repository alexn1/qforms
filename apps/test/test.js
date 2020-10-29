'use strict';
class testController extends ApplicationController {
    /*constructor(...args) {
        console.log('testController.constructor');
        super(...args);
    }*/
    getViewClass() {
        return testView;
    }
    onButtonClick = e => {
        console.log('testController.onButtonClick');
        QForms.startWait();
        setTimeout(() => QForms.stopWait(), 1000);
    }
}
testController;
