"use strict"

QForms.inherit(ApplicationController,VisualController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function ApplicationController(model,item,editorController) {
    VisualController.call(this,model);
    this.item = item;
    this.editorController = editorController;
    this.databasesItem = null;
    this.pagesItem = null;
    this.pageItems = {};
}

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationController.prototype.createTree = function() {
    // databases
    this.databasesItem = this.item.addItem("Databases");
    if (this.model.data.databases) {
        for (var name in this.model.data.databases) {
            var databaseData = this.model.data.databases[name];
            this.addDatabase(databaseData);
        }
    }

    // page links
    this.pagesItem = this.item.addItem("Pages","opened");
    if (this.model.data.pageLinks) {
        for (var name in this.model.data.pageLinks) {
            var pageLinkData = this.model.data.pageLinks[name];
            this.pageItems[name] = this.addPageLinkItem(pageLinkData);
        }
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationController.prototype.addDatabase = function(databaseData) {
    var caption = DatabaseController.prototype.getCaption(databaseData);
    var databaseItem = this.databasesItem.addItem(caption);
    var database = new Database(databaseData);
    databaseItem.ctrl = new DatabaseController(database,databaseItem,this);
    databaseItem.ctrl.createTree();
    return databaseItem;
}

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationController.prototype.addPageLinkItem = function(pageLinkData) {
    var caption = PageLinkController.prototype.getCaption(pageLinkData);
    var pageLinkItem = this.pagesItem.addItem(caption);
    pageLinkItem.node.className = "node";
    var pageLink = new PageLink(pageLinkData)
    pageLinkItem.ctrl = new PageLinkController(pageLink,pageLinkItem);
    return pageLinkItem;
}

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
}

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationController.prototype.getActions = function() {
    return [
        {"action":"newDatabase","caption":"New Database"},
        {"action":"newPage","caption":"New Page"}
    ];
}

////////////////////////////////////////////////////////////////////////////////////////////////////
ApplicationController.prototype.doAction = function(action) {
    switch (action) {
        case "newDatabase":
            this.newDatabaseAction();
            break;
        case "newPage":
            this.newPageAction();
            break;
        default:
            console.log(action);
    }
}

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
}

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
                self.addDatabase(databaseData).select();
            });
            $("#myModal").modal("hide");
        });
        $("#myModal").modal("show");
    });
}