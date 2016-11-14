'use strict';

////////////////////////////////////////////////////////////////////////////////////////////////////
function EditorController(appData) {
    var self = this;
    self.appData = appData;
    self.tree      = null;
    self.docs      = null;
    self.props     = null;
    self.listeners = {};
    EditorController.editorController = self;
}

////////////////////////////////////////////////////////////////////////////////////////////////////
EditorController.prototype.init = function() {
    var self = this;
    // tree
    self.tree = document.getElementById('tree')._obj;
    self.tree.on('doubleClick', self.listeners.doubleClick = self.onItemDoubleClick.bind(self));
    self.tree.on('select', self.listeners.select = self.onItemSelect.bind(self));
    self.tree.on('open', self.listeners.open = self.onItemOpen.bind(self));
    self.tree.on('delete', self.listeners.delete = self.onItemDelete.bind(self));
    // docs
    self.docs = document.getElementById('docs')._obj;
    self.docs.on('tabClosingByUser', self.listeners.tabClosingByUser = self.onTabClosingByUser.bind(self));
    // props
    self.props = new PropertyGrid(document.getElementById(('props')));
    self.props.on('changed', self.listeners.changed = self.onObjChange.bind(self));
    self.props.init();
    // root
    var caption = ApplicationController.prototype.getCaption(self.appData);
    var appItem = self.tree.addItem(caption, 'opened');
    var app = new Application(self.appData);
    appItem.ctrl = new ApplicationController(app, appItem, self);
    appItem.ctrl.createTree();
};

////////////////////////////////////////////////////////////////////////////////////////////////////
EditorController.prototype.deinit = function() {
    var self = this;
    self.tree.off('doubleClick', self.listeners.doubleClick);
    self.tree.off('select', self.listeners.select);
    self.tree.off('open', self.listeners.open);
    self.tree.off('delete', self.listeners.delete);
    self.docs.off('tabClosingByUser', self.listeners.tabClosingByUser);
    self.props.off('changed', self.listeners.changed);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
EditorController.prototype.onItemOpen = function(e) {
    var self = this;
    if (e.item.ctrl instanceof PageLinkController) {
        self.pageLinkToPage(e.item);
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
EditorController.prototype.onItemSelect = function(e) {
    var self = this;
    if (e.item.ctrl) {
        if (e.item.ctrl instanceof PageLinkController) {
            self.pageLinkToPage(e.item).then(function() {
                self.fillActionsAndGrid(e.item.ctrl);
            });
        } else {
            self.fillActionsAndGrid(e.item.ctrl);
        }
    } else {
        $('#treeActionsList').children().remove();
        $('#treeActionsList').append("<li class='disabled'><a href='#'>none</a></li>");
        self.props.endEdit();
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
EditorController.prototype.fillActionsAndGrid = function(ctrl) {
    var self = this;
    self.fillActions(ctrl);
    self.fillGrid(ctrl);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
EditorController.prototype.fillGrid = function(ctrl) {
    var self = this;
    var propList = ctrl.getPropList();
    self.props.beginEdit(propList['list'], propList['options']);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
EditorController.prototype.pageLinkToPage = function(item) {
    var self = this;
    var pageLink = item.ctrl.model;
    var args = {
        controller: 'Page',
        action    : 'get',
        params    : {
            fileName: pageLink.data['@attributes'].fileName
        }
    };
    return QForms.doHttpRequest(args).then(function (pageData) {
        var page = new Page(pageData, pageLink.parent, pageLink);
        item.ctrl = new PageController(page, item, pageLink);
        item.ctrl.createTree();
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
EditorController.prototype.onItemDelete = function(e) {
    var self = this;
    if (e.item.ctrl.tab) {
        self.docs.closeTab(e.item.ctrl.tab);
    }
    $('#treeActionsList').children().remove();
    $('#treeActionsList').append("<li class='disabled'><a href='#'>none</a></li>");
    self.props.endEdit();
};

////////////////////////////////////////////////////////////////////////////////////////////////////
EditorController.prototype.fillActions = function(ctrl) {
    var self = this;
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
    var self = this;
    self.tree.active.ctrl.setProperty(e.name, e.value);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
EditorController.prototype.onItemDoubleClick = function(e) {
    var self = this;
    if (e.item.ctrl instanceof ApplicationController ||
        e.item.ctrl instanceof DatabaseController ||
        e.item.ctrl instanceof PageController ||
        e.item.ctrl instanceof FormController ||
        e.item.ctrl instanceof FieldController ||
        e.item.ctrl instanceof DataSourceController
        )
    {
        if (e.item.ctrl.tab) {
            self.docs.selectTab(e.item.ctrl.tab);
        } else {
            e.item.ctrl.createTab(self.docs);
        }
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
EditorController.prototype.onTabClosingByUser = function(e) {
    var self = this;
    self.docs.closeTab(e.tab);
};