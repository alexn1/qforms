class ViewerFrontHostApp extends FrontHostApp {
    constructor(options = {}) {
        if (!options.data) throw new Error('no data');
        super();
        this.options = options;
        // this.data = options.data;
        this.applicationController = null;
        this.webSocketClient = null;
    }
    async run() {
        console.log('ViewerFrontHostApp.run', this.options.data);

        // application
        const application = new Application(this.options.data);
        application.init();

        // applicationController
        const applicationController = this.applicationController = ApplicationController.create(application, this);
        applicationController.init();

        // view
        const rootElementName = `.${applicationController.getViewClass().name}__root`;
        const rootElement = document.querySelector(rootElementName);
        if (!rootElement) {
            throw new Error(`no root element: ${rootElementName}`);
        }
        applicationController.createView(rootElement);

        // web socket client
        try {
            this.webSocketClient = new WebSocketClient({
                protocol: this.options.data.nodeEnv === 'development' ? 'ws' : 'wss',
                frontHostApp: this,
                route: this.options.data.route,
                uuid: this.options.data.uuid,
                userId: this.options.data.user ? this.options.data.user.id : null,
            });
            await this.webSocketClient.connect();
        } catch (err) {
            this.logError(err);
        }
    }
    async onWindowPopState(e) {
        // console.log('ViewerFrontHostApp.onWindowPopState', e.state);
        await this.applicationController.onWindowPopState(e);
    }
}

window.QForms.ViewerFrontHostApp = ViewerFrontHostApp;
