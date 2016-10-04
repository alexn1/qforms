'use strict';

QForms.inherits(ApplicationController, VisualController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function ApplicationController(model, item, editorController) {
    var self = this;
    VisualController.call(self, model);
    self.item             = item;
    self.editorController = editorController;
    self.databasesItem    = null;
    self.dataSourcesItem  = null;
    self.pagesItem        = null;
    self.pageItems        = {};
}

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationController.prototype.createTree = function() {
    var self = this;
    // databases
    self.databasesItem = self.item.addItem('Databases');
    if (self.model.data.databases) {
        for (var name in self.model.data.databases) {
            var databaseData = self.model.data.databases[name];
            self.addDatabaseItem(databaseData);
        }
    }
    // data sources
    self.dataSourcesItem = self.item.addItem('Data Sources');
    if (self.model.data.dataSources) {
        for (var name in self.model.data.dataSources) {
            var dataSourceData = self.model.data.dataSources[name];
            self.addDataSourceItem(dataSourceData);
        }
    }
    // pages
    self.pagesItem = self.item.addItem('Pages', 'opened');
    if (self.model.data.pageLinks) {
        for (var name in self.model.data.pageLinks) {
            var pageLinkData = self.model.data.pageLinks[name];
            self.pageItems[name] = self.addPageLinkItem(pageLinkData);
        }
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationController.prototype.addDatabaseItem = function(databaseData) {
    var self = this;
    var caption = DatabaseController.prototype.getCaption(databaseData);
    var databaseItem = self.databasesItem.addItem(caption);
    var database = new Database(databaseData);
    databaseItem.ctrl = new DatabaseController(database, databaseItem, self);
    databaseItem.ctrl.createTree();
    return databaseItem;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationController.prototype.addDataSourceItem = function(dataSourceData) {
    var self = this;
    var caption = DataSourceController.prototype.getCaption(dataSourceData);
    var dataSourceItem = self.dataSourcesItem.addItem(caption);
    var dataSource = new DataSource(dataSourceData, self.model);
    dataSourceItem.ctrl = new DataSourceController(dataSource, dataSourceItem, self);
    dataSourceItem.ctrl.createTree();
    return dataSourceItem;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationController.prototype.addPageLinkItem = function(pageLinkData) {
    var self = this;
    var caption = PageLinkController.prototype.getCaption(pageLinkData);
    var pageLinkItem = self.pagesItem.addItem(caption);
    pageLinkItem.node.className = 'node';
    var pageLink = new PageLink(pageLinkData, self.model)
    pageLinkItem.ctrl = new PageLinkController(pageLink, pageLinkItem);
    return pageLinkItem;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationController.prototype.addPageItem = function(pageData, pageLinkData) {
    var self = this;
    var caption = PageController.prototype.getCaption(pageData);
    var pageItem = self.pagesItem.addItem(caption);
    pageItem.node.className = 'node';
    var pageLink = new PageLink(pageLinkData, self.model);
    var page = new Page(pageData, self.model, pageLink);
    pageItem.ctrl = new PageController(page, pageItem, pageLink);
    pageItem.ctrl.createTree();
    return pageItem;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationController.prototype.getActions = function() {
    var self = this;
    return [
        {'action': 'newDatabase'  , 'caption': 'New Database'   },
        {'action': 'newDataSource', 'caption': 'New Data Source'},
        {'action': 'newPage'      , 'caption': 'New Page'       }
    ];
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationController.prototype.doAction = function(action) {
    var self = this;
    switch (action) {
        case 'newDatabase':
            self.newDatabaseAction();
            break;
        case 'newDataSource':
            self.newDataSourceAction();
            break;
        case 'newPage':
            self.newPageAction();
            break;
        default:
            console.log(action);
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationController.prototype.newPageAction = function() {
    var self = this;
    Page.prototype.getView('new.html', function(result) {
        $(document.body).append(result.view);
        $('#myModal').on('hidden.bs.modal', function(e){$(this).remove();});
        $("#myModal button[name='create']").click(function() {
            var name = $("#myModal input[id='name']").val();
            var caption = $("#myModal input[id='caption']").val();
            var startup = $("#myModal select[id='startup']").val();
            var params = {
                name:name,
                caption:caption,
                startup:startup
            };
            self.model.newPage(params, function (pageData, pageLinkData) {
                self.pageItems[name] = self.addPageItem(pageData, pageLinkData);
                self.pageItems[name].select();
            });
            $('#myModal').modal('hide');
        });
        $('#myModal').modal('show');
        $("#myModal input[id='name']").focus();
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationController.prototype.newDataSourceAction = function() {
    var self = this;
    DataSource.prototype.getView('new.html', function(result) {
        $(document.body).append(result.view);
        $('#myModal').on('hidden.bs.modal', function(e){$(this).remove();});
        $("#myModal button[name='create']").click(function() {
            var dsName = $("#myModal input[id='dsName']").val();
            var dsClass = $("#myModal select[id='dsClass']").val();
            var params = {
                name :dsName,
                class:dsClass
            };
            self.model.newDataSource(params, function(dataSourceData) {
                self.addDataSourceItem(dataSourceData).select();
            });
            $('#myModal').modal('hide');
        });
        $('#myModal').modal('show');
        $("#myModal input[id='dsName']").focus();
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationController.prototype.newDatabaseAction = function() {
    var self = this;
    Database.prototype.getView('new.html', function(result) {
        $(document.body).append(result.view);
        $('#myModal').on('hidden.bs.modal', function(e){$(this).remove();});
        $("#myModal button[name='create']").click(function() {

            var name     = $("#myModal input[id='name']").val();
            var host     = $("#myModal input[id='host']").val();
            var port     = $("#myModal input[id='port']").val();
            var dbname   = $("#myModal input[id='dbname']").val();
            var user     = $("#myModal input[id='user']").val();
            var password = $("#myModal input[id='password']").val();

            var params = {
                name:name,
                params:{
                    host:{
                        name:'host',
                        value:host
                    },
                    port:{
                        name:'port',
                        value:port
                    },
                    database:{
                        name:'database',
                        value:dbname
                    },
                    user:{
                        name:'user',
                        value:user
                    },
                    password:{
                        name:'password',
                        value:password
                    }
                }
            };
            self.model.newDatabase(params, function(databaseData) {
                self.addDatabaseItem(databaseData).select();
            });
            $('#myModal').modal('hide');
        });
        $('#myModal').modal('show');
        $("#myModal input[id='name']").focus();
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationController.prototype.getPropList = function() {
    var self = this;
    var propList = ApplicationController.super_.prototype.getPropList.call(self);
    propList.options['authentication'] = ['true', 'false'];
    propList.options['lang']           = ['en'  , 'ru'   ];
    return propList;
};