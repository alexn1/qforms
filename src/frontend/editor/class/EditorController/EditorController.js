class EditorController {
    constructor(appData) {
        console.log('EditorController.constructor');
        this.appData = appData;
        this.tree      = null;
        this.docs      = null;
        this.listeners = {};
        this.pg = null;
        this.appCtrl = null;
        EditorController.editorController = this;
    }

    init() {
        console.log('EditorController.init', this.appData);

        // tree
        this.tree = document.getElementById('tree')._obj;
        this.tree.on('doubleClick', this.listeners.doubleClick = this.onItemDoubleClick.bind(this));
        this.tree.on('select'     , this.listeners.select      = this.onItemSelect.bind(this));
        this.tree.on('open'       , this.listeners.open        = this.onItemOpen.bind(this));
        this.tree.on('delete'     , this.listeners.delete      = this.onItemDelete.bind(this));

        // docs
        this.docs = document.getElementById('docs')._obj;
        this.docs.on('tabClosingByUser', this.listeners.tabClosingByUser = this.onTabClosingByUser.bind(this));

        // appItem
        const caption = ApplicationController.prototype.getCaption(this.appData);
        const appModel = new Application(this.appData);
        appModel.init();
        console.log('appModel:', appModel);

        this.appCtrl = new ApplicationController(appModel, this);

        const appItem = this.tree.addItem(caption, 'opened');
        appItem.ctrl = this.appCtrl;
        this.appCtrl.createTree(appItem);

        // view
        Helper.createReactComponent(document.getElementById('root2'), EditorView, {ctrl: this});
    }

    deinit() {
        this.tree.off('doubleClick'     , this.listeners.doubleClick);
        this.tree.off('select'          , this.listeners.select);
        this.tree.off('open'            , this.listeners.open);
        this.tree.off('delete'          , this.listeners.delete);
        this.docs.off('tabClosingByUser', this.listeners.tabClosingByUser);
    }

    onItemOpen(e) {
        if (e.item.ctrl instanceof PageLinkController) {
            this.pageLinkToPage(e.item);
        }
    }
    onItemOpen2 = async item => {
        console.log('EditorController.onItemOpen2', item);
        if (item.ctrl instanceof PageLinkController) {
            await this.pageLinkToPage2(item);
        }
    }
    async onItemSelect(e) {
        console.log('EditorController.onItemSelect');
        if (e.item.ctrl) {
            if (e.item.ctrl instanceof PageLinkController) {
                await this.pageLinkToPage(e.item);
            }
            this.fillActions(e.item.ctrl);
            this.fillPropertyGrid(e.item.ctrl);
        } else {
            this.clearActions();
            this.endEdit();
        }
    }

    onItemSelect2 = async item => {
        console.log('EditorController.onItemSelect2', item);
        if (item.ctrl) {
            if (item.ctrl instanceof PageLinkController) {
                await this.pageLinkToPage2(item);
            }
            this.fillActions(item.ctrl);
            this.fillPropertyGrid(item.ctrl);
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
        this.tree.active.ctrl.setProperty(name, value);
    }

    beginEdit(obj, options) {
        console.log('EditorController.beginEdit', obj, options);
        this.pg.setState({object: {obj, options}});
    }

    endEdit() {
        console.log('EditorController.endEdit');
        this.pg.setState({object: null});
    }

    async pageLinkToPage(item) {
        console.log('EditorController.pageLinkToPage');
        const pageLink = item.ctrl.model;

        const pageData = await QForms.doHttpRequest({
            controller: 'Page',
            action    : 'get',
            params    : Helper.encodeObject({
                fileName: pageLink.data['@attributes'].fileName
            })
        });
        const page = new Page(pageData, pageLink.parent, pageLink);
        page.init();
        item.ctrl = new PageController(page, item, pageLink);
        item.ctrl.createTree();
    }

    static async fetchPageData(fileName) {
        console.log('EditorController.fetchPageData', fileName);
        return await QForms.doHttpRequest({
            controller: 'Page',
            action    : 'get',
            params    : Helper.encodeObject({fileName})
        });
    }

    async pageLinkToPage2(item) {
        console.log('EditorController.pageLinkToPage2');
        const pageLink = item.ctrl.model;
        const pageData = await EditorController.fetchPageData(pageLink.getFileName());
        const page = new Page(pageData, pageLink.parent, pageLink);
        page.init();

        // change item controller
        const c = item.ctrl.c;
        item.ctrl = new PageController(page, item, pageLink);
        item.items = item.ctrl.getItem().items;
        console.log('item.items:', item.items);
        item.ctrl.c = c;
        item.ctrl.c.rerender();
    }

    onItemDelete(e) {
        if (e.item.ctrl.tab) {
            this.docs.closeTab(e.item.ctrl.tab);
        }
        $('#treeActionsList').children().remove();
        $('#treeActionsList').append("<li class='disabled'><a href='#'>none</a></li>");
        this.endEdit();
    }

    fillActions(ctrl) {
        $('#treeActionsList').children().remove();
        ctrl.getActions().forEach((action) => {
            if (action.caption === '-') {
                $('#treeActionsList').append("<li class='divider'></li>");
            } else {
                const li = document.createElement('li');
                li.miAction = action.action;
                li.ctrl = ctrl;
                $(li).click(function() {
                    this.ctrl.doAction(this.miAction);
                });
                li.innerHTML = `<a style='cursor: pointer;'>${action.caption}</a>`;
                $('#treeActionsList').append(li);
            }
        });
    }

    onItemDoubleClick(e) {
        console.log('EditorController.onItemDoubleClick', e.item);
        const controller = e.item.ctrl;
        if (!controller || !controller instanceof DocumentController) return;
        if (controller.tab) {
            this.docs.selectTab(controller.tab);
        } else {
            controller.createTab(this.docs);
        }
    }
    onItemDoubleClick2 = item => {
        console.log('EditorController.onItemDoubleClick2', item);
        const controller = item.ctrl;
        if (!controller || !controller instanceof DocumentController) return;
        if (controller.tab) {
            this.docs.selectTab(controller.tab);
        } else {
            controller.createTab(this.docs);
        }
    }
    onTabClosingByUser(e) {
        this.docs.closeTab(e.tab);
    }

    getTreeItems() {
        return [this.appCtrl.getItem()];
    }

}
