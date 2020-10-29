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
    onFileChange = e => {
        // console.log('testController.onFileChange', e.target.files);
        const file = e.target.files[0];
        console.log('file:', file instanceof File, file);
    }
}
testController;
