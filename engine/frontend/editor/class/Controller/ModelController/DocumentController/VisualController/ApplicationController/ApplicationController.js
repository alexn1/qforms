'use strict';

QForms.inherit(ApplicationController,VisualController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function ApplicationController(model, item, editorController) {
    VisualController.call(this, model);
    this.item             = item;
    this.editorController = editorController;
    this.databasesItem    = null;
    this.dataSourcesItem  = null;
    this.pagesItem        = null;
    this.pageItems        = {};
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationController.prototype.createTree = function() {
    // databases
    this.databasesItem = this.item.addItem("Databases");
    if (this.model.data.databases) {
        for (var name in this.model.data.databases) {
            var databaseData = this.model.data.databases[name];
            this.addDatabaseItem(databaseData);
        }
    }
    // data sources
    this.dataSourcesItem = this.item.addItem("Data Sources");
    if (this.model.data.dataSources) {
        for (var name in this.model.data.dataSources) {
            var dataSourceData = this.model.data.dataSources[name];
            this.addDataSourceItem(dataSourceData);
        }
    }
    // pages
    this.pagesItem = this.item.addItem("Pages","opened");
    if (this.model.data.pageLinks) {
        for (var name in this.model.data.pageLinks) {
            var pageLinkData = this.model.data.pageLinks[name];
            this.pageItems[name] = this.addPageLinkItem(pageLinkData);
        }
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationController.prototype.addDatabaseItem = function(databaseData) {
    var caption = DatabaseController.prototype.getCaption(databaseData);
    var databaseItem = this.databasesItem.addItem(caption);
    var database = new Database(databaseData);
    databaseItem.ctrl = new DatabaseController(database,databaseItem,this);
    databaseItem.ctrl.createTree();
    return databaseItem;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationController.prototype.addDataSourceItem = function(dataSourceData) {
    var caption = DataSourceController.prototype.getCaption(dataSourceData);
    var dataSourceItem = this.dataSourcesItem.addItem(caption);
    var dataSource = new DataSource(dataSourceData, this.model);
    dataSourceItem.ctrl = new DataSourceController(dataSource, dataSourceItem, this);
    dataSourceItem.ctrl.createTree();
    return dataSourceItem;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationController.prototype.addPageLinkItem = function(pageLinkData) {
    var caption = PageLinkController.prototype.getCaption(pageLinkData);
    var pageLinkItem = this.pagesItem.addItem(caption);
    pageLinkItem.node.className = "node";
    var pageLink = new PageLink(pageLinkData)
    pageLinkItem.ctrl = new PageLinkController(pageLink,pageLinkItem);
    return pageLinkItem;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationController.prototype.addPageItem = function(pageData,pageLinkData) {
    var caption = PageController.prototype.getCaption(pageData);
    var pageItem = this.pagesItem.addItem(caption);
    pageItem.node.className = "node";
    var pageLink = new PageLink(pageLinkData);
    var page = new Page(pageData,pageLink);
    pageItem.ctrl = new PageController(page,pageItem,pageLink);
    pageItem.ctrl.createTree();
    return pageItem;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationController.prototype.getActions = function() {
    return [
        {"action":"newDatabase","caption":"New Database"},
        {"action":"newDataSource","caption":"New Data Source"},
        {"action":"newPage","caption":"New Page"}
    ];
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationController.prototype.doAction = function(action) {
    switch (action) {
        case "newDatabase":
            this.newDatabaseAction();
            break;
        case 'newDataSource':
            this.newDataSourceAction();
            break;
        case "newPage":
            this.newPageAction();
            break;
        default:
            console.log(action);
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationController.prototype.newPageAction = function() {
    var self = this;
    Page.prototype.getView("new.html", function(result) {
        $(document.body).append(result.view);
        $('#myModal').on('hidden.bs.modal',function(e){$(this).remove();});
        $("#myModal button[name='create']").click(function() {
            var name = $("#myModal input[id='name']").val();
            var caption = $("#myModal input[id='caption']").val();
            var startup = $("#myModal select[id='startup']").val();
            var params = {
                name:name,
                caption:caption,
                startup:startup
            };
            self.model.newPage(params,function (pageData,pageLinkData) {
                self.pageItems[name] = self.addPageItem(pageData,pageLinkData);
                self.pageItems[name].select();
            });
            $("#myModal").modal("hide");
        });
        $("#myModal").modal("show");
        $("#myModal input[id='name']").focus();
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationController.prototype.newDataSourceAction = function() {
    var self = this;
    DataSource.prototype.getView("new.html", function(result) {
        $(document.body).append(result.view);
        $('#myModal').on('hidden.bs.modal',function(e){$(this).remove();});
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
            $("#myModal").modal("hide");
        });
        $("#myModal").modal("show");
        $("#myModal input[id='dsName']").focus();
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationController.prototype.newDatabaseAction = function() {
    var self = this;
    Database.prototype.getView("new.html", function(result) {
        $(document.body).append(result.view);
        $('#myModal').on('hidden.bs.modal',function(e){$(this).remove();});
        $("#myModal button[name='create']").click(function() {

            var name = $("#myModal input[id='name']").val();
            var host = $("#myModal input[id='host']").val();
            var dbname = $("#myModal input[id='dbname']").val();
            var user = $("#myModal input[id='user']").val();
            var password = $("#myModal input[id='password']").val();

            var params = {
                name:name,
                params:{
                    host:{
                        name:"host",
                        value:host
                    },
                    database:{
                        name:"database",
                        value:dbname
                    },
                    user:{
                        name:"user",
                        value:user
                    },
                    password:{
                        name:"password",
                        value:password
                    }
                }
            };
            self.model.newDatabase(params,function(databaseData) {
                self.addDatabaseItem(databaseData).select();
            });
            $("#myModal").modal("hide");
        });
        $("#myModal").modal("show");
        $("#myModal input[id='name']").focus();
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationController.prototype.getPropList = function() {
    var propList = ApplicationController.super_.prototype.getPropList.call(this);
    propList.options['authentication'] = ["true","false"];
    return propList;
};