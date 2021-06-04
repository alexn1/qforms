class ViewerFrontHostApp extends FrontHostApp {
    run() {
        console.log('ViewerFrontHostApp.run');

        // application
        const application = new Application(this.data);
        application.init();

        // applicationController
        const applicationController = ApplicationController.create(application);
        applicationController.init();

        // view
        const rootElementName = `.${applicationController.getViewClass().name}__root`;
        const rootElement = document.querySelector(rootElementName);
        if (!rootElement) {
            throw new Error(`no root element: ${rootElementName}`);
        }
        applicationController.createView(rootElement);
    }
}
