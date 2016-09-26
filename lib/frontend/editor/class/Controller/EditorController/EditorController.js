'use strict';

////////////////////////////////////////////////////////////////////////////////////////////////////
function EditorController(appData) {
    var self = this;
    this.appData = appData;
    this.tree      = null;
    this.docs      = null;
    this.props     = null;
    self.listeners = {};
    EditorController.editorController = this;
}

////////////////////////////////////////////////////////////////////////////////////////////////////
EditorController.prototype.init = function() {
    var self = this;
    // tree
    this.tree = document.getElementById('tree')._obj;
    //this.tree.eventDoubleClick.subscribe(this, 'onItemDoubleClick');
    self.tree.on('doubleClick', self.listeners.doubleClick = self.onItemDoubleClick.bind(self));
    this.tree.eventSelect.subscribe(this, 'onItemSelect');
    this.tree.eventOpen.subscribe(this, 'onItemOpen');
    this.tree.eventDelete.subscribe(this, 'onItemDelete');
    // docs
    this.docs = document.getElementById('docs')._obj;
    //this.docs.eventTabClosingByUser.subscribe(this, 'onTabClosingByUser');
    self.docs.on('tabClosingByUser', self.listeners.tabClosingByUser = self.onTabClosingByUser.bind(self));
    // props
    this.props = new PropertyGrid(document.getElementById(('props')));
    this.props.eventChanged.subscribe(this, 'onObjChange');
    this.props.init();
    // root
    var caption = ApplicationController.prototype.getCaption(this.appData);
    var appItem = this.tree.addItem(caption, 'opened');
    var app = new Application(this.appData);
    appItem.ctrl = new ApplicationController(app, appItem, this);
    appItem.ctrl.createTree();
};

////////////////////////////////////////////////////////////////////////////////////////////////////
EditorController.prototype.deinit = function() {
    var self = this;
    //this.tree.eventDoubleClick.unsubscribe(this, 'onItemDoubleClick');
    self.tree.off('doubleClick', self.listeners.doubleClick);
    this.tree.eventSelect.unsubscribe(this, 'onItemSelect');
    this.tree.eventOpen.unsubscribe(this, 'onItemOpen');
    this.tree.eventDelete.unsubscribe(this, 'onItemDelete');
    //this.docs.eventTabClosingByUser.unsubscribe(this, 'onTabClosingByUser');
    self.docs.off('tabClosingByUser', self.listeners.tabClosingByUser);
    this.props.eventChanged.unsubscribe(this, 'onObjChange');
};

////////////////////////////////////////////////////////////////////////////////////////////////////
EditorController.prototype.onItemOpen = function(e) {
    if (e.item.ctrl instanceof PageLinkController) {
        this.pageLinkToPage(e.item);
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
EditorController.prototype.onItemSelect = function(e) {
    var self = this;
    if (e.item.ctrl) {
        if (e.item.ctrl instanceof PageLinkController) {
            this.pageLinkToPage(e.item, function() {
                self.fillActionsAndGrid(e.item.ctrl);
            });
        } else {
            this.fillActionsAndGrid(e.item.ctrl);
        }
    } else {
        $('#treeActionsList').children().remove();
        $('#treeActionsList').append("<li class='disabled'><a href='#'>none</a></li>");
        this.props.endEdit();
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
EditorController.prototype.fillActionsAndGrid = function(ctrl) {
    this.fillActions(ctrl);
    this.fillGrid(ctrl);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
EditorController.prototype.fillGrid = function(ctrl) {
    var propList = ctrl.getPropList();
    this.props.beginEdit(propList['list'], propList['options']);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
EditorController.prototype.pageLinkToPage = function(item, callback) {
    var pageLink = item.ctrl.model;
    var args = {
        controller:'Page',
        action:'get',
        params:{
            fileName:pageLink.data['@attributes'].fileName
        }
    };
    QForms.doHttpRequest(this, args, function(pageData) {
        var page = new Page(pageData, pageLink.parent, pageLink);
        item.ctrl = new PageController(page, item, pageLink);
        item.ctrl.createTree();
        if (callback) {
            callback();
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
EditorController.prototype.onItemDelete = function(e) {
    if (e.item.ctrl.tab) {
        this.docs.closeTab(e.item.ctrl.tab);
    }
    $('#treeActionsList').children().remove();
    $('#treeActionsList').append("<li class='disabled'><a href='#'>none</a></li>");
    this.props.endEdit();
};

////////////////////////////////////////////////////////////////////////////////////////////////////
EditorController.prototype.fillActions = function(ctrl) {
    $('#treeActionsList').children().remove();
    ctrl.getActions().forEach(function (action) {
        if (action.caption === '-') {
            $('#treeActionsList').append("<li class='divider'></li>");
        } else {
            var li = document.createElement('li');
            li.miAction = action.action;
            li.ctrl = ctrl;
            $(li).click(function() {
                this.ctrl.doAction(this.miAction);
            });
            li.innerHTML = "<a style='cursor: pointer;'>{caption}</a>".replace('{caption}', action.caption);
            $('#treeActionsList').append(li);
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
EditorController.prototype.onObjChange = function(e) {
    this.tree.active.ctrl.setProperty(e.name, e.value);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
EditorController.prototype.onItemDoubleClick = function(e) {
    if (e.item.ctrl instanceof ApplicationController ||
        e.item.ctrl instanceof DatabaseController ||
        e.item.ctrl instanceof PageController ||
        e.item.ctrl instanceof FormController ||
        e.item.ctrl instanceof FieldController ||
        e.item.ctrl instanceof DataSourceController
        )
    {
        if (e.item.ctrl.tab) {
            this.docs.selectTab(e.item.ctrl.tab);
        } else {
            e.item.ctrl.createTab(this.docs);
        }
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
EditorController.prototype.onTabClosingByUser = function(e) {
    this.docs.closeTab(e.tab);
};

