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
        const appItem = this.tree.addItem(caption, 'opened');
        this.appCtrl = appItem.ctrl = new ApplicationController(appModel, appItem, this);
        appItem.ctrl.createTree();

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
        item.ctrl = new PageController(page, item, pageLink);
        item.ctrl.createTree();
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

    onTabClosingByUser(e) {
        this.docs.closeTab(e.tab);
    }

    getTreeItems() {
        return [this.appCtrl.getItem()];
    }

}
