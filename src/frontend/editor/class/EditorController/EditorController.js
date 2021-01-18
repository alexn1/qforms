class EditorController {
    constructor(appData) {
        console.log('EditorController.constructor');
        this.appData = appData;
        this.tree      = null;
        this.docs      = null;
        this.props     = null;
        this.listeners = {};
        EditorController.editorController = this;
        this.editObj     = null;
        this.editOptions = null;
    }

    init() {
        console.log('EditorController.init');

        // tree
        this.tree = document.getElementById('tree')._obj;
        this.tree.on('doubleClick', this.listeners.doubleClick = this.onItemDoubleClick.bind(this));
        this.tree.on('select'     , this.listeners.select      = this.onItemSelect.bind(this));
        this.tree.on('open'       , this.listeners.open        = this.onItemOpen.bind(this));
        this.tree.on('delete'     , this.listeners.delete      = this.onItemDelete.bind(this));

        // docs
        this.docs = document.getElementById('docs')._obj;
        this.docs.on('tabClosingByUser', this.listeners.tabClosingByUser = this.onTabClosingByUser.bind(this));

        // props
        this.props = new PropertyGrid(document.getElementById('props'), this);
        this.props.on('changed', this.listeners.changed = this.onObjChange.bind(this));
        this.props.init();

        // appItem
        const caption = ApplicationController.prototype.getCaption(this.appData);
        const app = new Application(this.appData);
        const appItem = this.tree.addItem(caption, 'opened');
        appItem.ctrl = new ApplicationController(app, appItem, this);
        appItem.ctrl.createTree();

        const root = document.getElementById('root');
        console.log('root:', root);
        const pg = Helper.createReactComponent(root, PropertyGrid2);

    }

    deinit() {
        this.tree.off('doubleClick'     , this.listeners.doubleClick);
        this.tree.off('select'          , this.listeners.select);
        this.tree.off('open'            , this.listeners.open);
        this.tree.off('delete'          , this.listeners.delete);
        this.docs.off('tabClosingByUser', this.listeners.tabClosingByUser);
        this.props.off('changed'        , this.listeners.changed);
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
            this.fillActionsAndGrid(e.item.ctrl);
        } else {
            this.clearActions();
            this.props.endEdit();
        }
    }

    clearActions() {
        $('#treeActionsList').children().remove();
        $('#treeActionsList').append("<li class='disabled'><a href='#'>none</a></li>");
    }

    fillActionsAndGrid(ctrl) {
        this.fillActions(ctrl);
        this.fillPropertyGrid(ctrl);
    }

    fillPropertyGrid(ctrl) {
        const propList = ctrl.getPropList();
        this.beginEdit(propList['list'], propList['options']);
    }

    beginEdit(obj, options) {
        this.editObj     = obj;
        this.editOptions = options;
        this.props.beginEdit(obj, options);
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

    endEdit() {
        this.editObj     = null;
        this.editOptions = null;
        this.props.endEdit();
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

    onObjChange(e) {
        this.tree.active.ctrl.setProperty(e.name, e.value);
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

}
