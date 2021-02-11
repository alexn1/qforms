class EditorController {
    constructor(appData, runAppLink) {
        console.log('EditorController.constructor');
        EditorController.editorController = this;
        this.appData = appData;
        this.runAppLink = runAppLink;
        this.docs      = null;
        this.listeners = {};
        this.appCtrl = null;
        this.pg = null;
        this.treeWidget2 = null;
        this.items = null;              // treeWidget2 items
    }

    init() {
        console.log('EditorController.init', this.appData);

        // docs
        this.docs = document.getElementById('docs')._obj;
        this.docs.on('tabClosingByUser', this.listeners.tabClosingByUser = this.onTabClosingByUser.bind(this));

        // appModel
        const appModel = new Application(this.appData);
        appModel.init();
        // console.log('appModel:', appModel);

        // application controller
        this.appCtrl = new ApplicationController(appModel, this);
        this.appCtrl.init();
        this.items = [this.appCtrl];

        // view
        Helper.createReactComponent(document.getElementById('sidebar'), EditorView, {ctrl: this});

        // view 2
        Helper.createReactComponent(document.getElementById('root2'), EditorView2, {ctrl: this});
    }

    deinit() {
        this.docs.off('tabClosingByUser', this.listeners.tabClosingByUser);
    }
    onItemOpen2 = async item => {
        console.log('EditorController.onItemOpen2', item.getTitle());
        // console.log('parent:', item.view.parent);
        if (item instanceof PageLinkController && !item.hasPage()) {
            await item.loadPage();
        }
    }
    onItemSelect2 = async item => {
        console.log('EditorController.onItemSelect2', item ? item.getTitle() : null);
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
    clearActions() {
        $('#treeActionsList').children().remove();
        $('#treeActionsList').append("<li class='disabled'><a href='#'>none</a></li>");
    }
    fillPropertyGrid(ctrl) {
        const propList = ctrl.getPropList();
        this.beginEdit(propList['list'], propList['options']);
    }

    onPropertyGrid2Change = (name, value) => {
        console.log('EditorController.onPropertyGrid2Change', name, value);
        const controller = this.treeWidget2.getSelectedItem();
        // console.log('controller', controller);
        controller.setProperty(name, value);
    }

    beginEdit(obj, options) {
        console.log('EditorController.beginEdit', obj, options);
        this.pg.setState({object: {obj, options}});
    }

    endEdit() {
        console.log('EditorController.endEdit');
        this.pg.setState({object: null});
    }

    static async fetchPageData(fileName) {
        console.log('EditorController.fetchPageData', fileName);
        return await QForms.doHttpRequest({
            controller: 'Page',
            action    : 'get',
            params    : Helper.encodeObject({fileName})
        });
    }

    fillActions(ctrl) {
        $('#treeActionsList').children().remove();
        ctrl.getActions().forEach(action => {
            if (action.caption === '-') {
                $('#treeActionsList').append("<li class='divider'></li>");
            } else {
                const li = document.createElement('li');
                li.miAction = action.action;
                li.ctrl = ctrl;
                $(li).click(function() {
                    const controller = this.ctrl instanceof PageLinkController ? this.ctrl.pageController : this.ctrl;
                    controller.doAction(this.miAction);
                });
                li.innerHTML = `<a style='cursor: pointer;'>${action.caption}</a>`;
                $('#treeActionsList').append(li);
            }
        });
    }

    onItemDoubleClick2 = item => {
        console.log('EditorController.onItemDoubleClick2', item.getTitle());
        const controller = item instanceof PageLinkController ? item.pageController : item;
        if (!controller || !controller instanceof DocumentController) return;
        this.openDocument(controller);
    }
    onTabClosingByUser(e) {
        this.docs.closeTab(e.tab);
    }
    openDocument(controller) {
        console.log('EditorController.openDocument', controller.getTitle());
        if (controller.tab) {
            this.docs.selectTab(controller.tab);
        } else {
            controller.createTab(this.docs);
        }
    }

}
