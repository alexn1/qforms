'use strict';

QForms.inherit(DataSourceController, DocumentController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function DataSourceController(model, item) {
    DataSourceController.super_.call(this, model);
    this.item                 = item;
    this.itemKeys             = null;
    this.itemParentKeyColumns = null;
    this.$view                = null;
    this.cmQuery              = null;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceController.prototype.createTree = function() {
    // keys
    this.itemKeys = this.item.addItem("Key Columns");
    if (this.model.data.keyColumns)
    for (var name in this.model.data.keyColumns) {
        var keyColumnData = this.model.data.keyColumns[name];
        this.addKeyColumn(keyColumnData);
    };

    // parent key columns
    this.itemParentKeyColumns = this.item.addItem("Parent Key Columns");
    if (this.model.data.parentKeyColumns)
    for (var name in this.model.data.parentKeyColumns) {
        var pkcData = this.model.data.parentKeyColumns[name];
        this.addParentKeyColumn(pkcData);
    };
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceController.prototype.addKeyColumn = function(itemData) {
    var caption = KeyColumnController.prototype.getCaption(itemData);
    var keyColumnItem = this.itemKeys.addItem(caption);
    var keyColumn = new KeyColumn(itemData,this.model);
    keyColumnItem.ctrl = new KeyColumnController(keyColumn,keyColumnItem);
    return keyColumnItem;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceController.prototype.addParentKeyColumn = function(pkcData) {
    var caption = ParentKeyColumnController.prototype.getCaption(pkcData);
    var itemParentKeyColumn = this.itemParentKeyColumns.addItem(caption);
    var parentKeyColumn = new ParentKeyColumn(pkcData,this.model);
    itemParentKeyColumn.ctrl = new ParentKeyColumnController(parentKeyColumn,itemParentKeyColumn);
    return itemParentKeyColumn;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceController.prototype.getActions = function() {
    return [
        {
            "action":"newItem",
            "caption":"New Key Column"
        },
        {
            "action":"newParentKeyColumn",
            "caption":"New Parent Key Column"
        },
        {
            "action":"",
            "caption":"-"
        },
        {
            "action":"delete",
            "caption":"Delete"
        }
    ];
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceController.prototype.doAction = function(action) {
    switch (action) {
        case "newItem":
            this.actionNewKeyColumn();
            break;
        case "newParentKeyColumn":
            this.actionNewParentKeyColumn();
            break;
        case "delete":
            this.delete();
            break;
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceController.prototype.actionNewKeyColumn = function() {
    var self = this;
    KeyColumn.prototype.getView("new.html", function(result) {
        $(document.body).append(result.view);
        $('#myModal').on('hidden.bs.modal',function(e){$(this).remove();});
        $("#myModal button[name='create']").click(function() {
            var itemName = $("#myModal input[id='itemName']").val();
            self.model.newKeyColumn(itemName,function(itemData) {
                self.addKeyColumn(itemData).select();
            });
            $("#myModal").modal("hide");
        });
        $("#myModal").modal("show");
        $("#myModal input[id='itemName']").focus();
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceController.prototype.actionNewParentKeyColumn = function() {
    var self = this;
    ParentKeyColumn.prototype.getView("new.html", function(result) {
        $(document.body).append(result.view);
        $('#myModal').on('hidden.bs.modal',function(e){$(this).remove();});
        $("#myModal button[name='create']").click(function() {
            var pkcName = $("#myModal input[id='pkcName']").val();
            self.model.newParentKeyColumn(pkcName,function(parentKeyColumnData) {
                self.addParentKeyColumn(parentKeyColumnData).select();
            });
            $("#myModal").modal("hide");
        });
        $("#myModal").modal("show");
        $("#myModal input[id='pkcName']").focus();
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceController.prototype.getPropList = function() {
    var progList = {
        list   : {},
        options: {}
    };

    // list
    for (var name in this.model.data["@attributes"]) {
        if (name !== 'query') {
            progList.list[name] = this.model.data["@attributes"][name];
        }
    }

    // options
    progList.options["insertNewKey"]         = ["true","false"];
    progList.options["dumpFirstRowToParams"] = ["true","false"];
    return progList;
};



////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceController.prototype.createTab = function(docs) {
    var self = this;
    var name = this.model.getFullName();
    this.model.getView("QueryView.html",function(result) {
        self.$view = $(result.view);
        self.tab = docs.createTab(self.$view.get(0), name, function(tab) {
            tab.ctrl.tab = undefined;
        });
        self.tab.ctrl = self;
        docs.selectTab(self.tab);

        // cmQuery
        self.$view.find(".btnSave").click(function() {
            self.btnSave_Click();
        });

        // cmQuery
        self.cmQuery = CodeMirror.fromTextArea(self.$view.find(".cmQuery").get(0), {lineNumbers: true,styleActiveLine: true,matchBrackets: true});
        self.cmQuery.setOption("theme", "cobalt");
        self.cmQuery.setValue(self.model.data['@attributes'].query);
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceController.prototype.btnSave_Click = function() {
    var value = this.cmQuery.getValue();
    this.model.setValue('query', value);
};