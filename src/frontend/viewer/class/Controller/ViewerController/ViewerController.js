'use strict';

class ViewerController {
    constructor(data) {
        //console.log('ViewerController', data);
        this.data                  = data;
        this.application           = null;
        this.applicationController = null;
    }

    init() {
        console.log('ViewerController.init');

        const root = document.querySelector('#client');

        // application
        const application = this.application = new Application(this.data);
        application.init();

        let view = null;

        // const html = QForms.render(this.application.data.view, {model: this.application});
        // view = $(html).get(0);

        // applicationController
        const ctrl = this.applicationController = ApplicationController.create(this.application, view);
        ctrl.init();





        // show view
        console.log('append app view to DOM');
        if (view) {
            root.appendChild(view);
        } else {
            ApplicationController.createReactComponent(root, ApplicationView, {ctrl});
        }

    }

    deinit() {
        this.applicationController.deinit();
        this.application.deinit();
    }

}
