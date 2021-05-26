class EditorApp {
    constructor(data, runAppLink) {
        console.log('EditorApp.constructor');
        EditorApp.editorApp = this;
        this.data = data;
        this.runAppLink = runAppLink;
        this.view = null;
        this.actionList = null;
        this.treeWidget2 = null;
        this.pg = null;                 // property grid
        this.items = null;              // treeWidget2 items
        this.tabWidget = null;
        this.documents = [];
        this.modal = null;
    }

    run() {
        console.log('EditorApp.run', this.data);

        // app
        const app = new Application(this.data);
        app.init();
        // console.log('app:', app);

        // application controller
        const applicationController = new ApplicationController(app, this);
        applicationController.init();
        this.items = [applicationController];

        // view
        this.view = Helper.createReactComponent(document.querySelector('.editor__root'), EditorAppView, {ctrl: this});
    }

    deinit() {
    }
    onItemOpen2 = async item => {
        console.log('EditorApp.onItemOpen2', item.getTitle());
        // console.log('parent:', item.view.parent);
        if (item instanceof PageLinkController && !item.hasPage()) {
            await item.loadPage();
        }
    }
    onItemSelect2 = async item => {
        console.log('EditorApp.onItemSelect2', item ? item.getTitle() : null);
        if (item instanceof ModelController) {
            if (item instanceof PageLinkController && !item.hasPage()) {
                await item.loadPage();
            }
            this.fillActions(item);
            this.fillPropertyGrid(item);
        } else {
            this.clearActions();
            this.endEdit();
        }
    }

    fillPropertyGrid(ctrl) {
        const propList = ctrl.getPropList();
        this.beginEdit(propList['list'], propList['options']);
    }

    onPropertyGrid2Change = (name, value) => {
        console.log('EditorApp.onPropertyGrid2Change', name, value);
        const controller = this.treeWidget2.getSelectedItem();
        // console.log('controller', controller);
        controller.setProperty(name, value);
    }

    beginEdit(obj, options) {
        console.log('EditorApp.beginEdit', obj, options);
        this.pg.setState({object: {obj, options}});
    }

    endEdit() {
        console.log('EditorApp.endEdit');
        this.pg.setState({object: null});
    }

    static async fetchPageData(fileName) {
        console.log('EditorApp.fetchPageData', fileName);
        return await FrontHostApp.doHttpRequest({
            controller: 'Page',
            action    : 'get',
            params    : Helper.encodeObject({fileName})
        });
    }

    fillActions(item) {
        // console.log('EditorApp.fillActions');
        this.actionList.setState({item});
    }
    clearActions() {
        // console.log('EditorApp.clearActions');
        this.actionList.setState({item: null});
    }

    onItemDoubleClick2 = async item => {
        console.log('EditorApp.onItemDoubleClick2', item.getTitle());
        const controller = item instanceof PageLinkController ? item.pageController : item;
        if (!controller || !(controller instanceof DocumentController)) return;
        await this.openDocument(controller);
    }
    async openDocument(controller) {
        console.log('EditorApp.openDocument', controller.getTitle());
        let document = this.findDocument(controller);
        if (!document) {
            document = await controller.createDocument();
            this.documents.push(document);
            // console.log('document:', document);
        }
        this.tabWidget.state.active = this.documents.indexOf(document);
        await this.view.rerender();
    }
    findDocument(controller) {
        return this.documents.find(document => document.controller === controller) || null;
    }
    onDocumentClose = i => {
        console.log('EditorApp.onDocumentClose', i, this.tabWidget.state.active);
        const document = this.documents[i];
        const activeDocument = this.documents[this.tabWidget.state.active];
        this.documents.splice(i, 1);
        document.controller.onDocumentClose();
        if (document === activeDocument) {
            if (this.documents.length) {
                if (this.tabWidget.state.active >= this.documents.length) {
                    this.tabWidget.state.active = this.documents.length - 1;
                }
            } else {
                this.tabWidget.state.active = null;
            }
        } else {
            this.tabWidget.state.active = this.documents.indexOf(activeDocument);
        }
        this.view.rerender();
    }
    async openModal(modalController) {
        console.log('EditorApp.openModal');
        this.modal = modalController;
        await this.view.rerender();
    }
    async onModalClose() {
        console.log('EditorApp.onModalClose');
        this.modal = null;
        await this.view.rerender();
    }
    onActionClick = async actionName => {
        console.log('EditorApp.onActionClick', actionName);
        const item = this.treeWidget2.getSelectedItem();
        // console.log('item', item);
        const controller = item instanceof PageLinkController ? item.pageController : item;
        await controller.doAction(actionName);
    }
}

