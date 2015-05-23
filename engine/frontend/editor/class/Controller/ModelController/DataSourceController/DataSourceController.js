"use strict"

QForms.inherit(DataSourceController,ModelController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function DataSourceController(model,item) {
    ModelController.call(this,model);
    this.item = item;
    this.itemKeys = null;
    this.itemParentKeyColumns = null;
}

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
}

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceController.prototype.addKeyColumn = function(itemData) {
    var caption = KeyColumnController.prototype.getCaption(itemData);
    var keyColumnItem = this.itemKeys.addItem(caption);
    var keyColumn = new KeyColumn(itemData,this.model);
    keyColumnItem.ctrl = new KeyColumnController(keyColumn,keyColumnItem);
    return keyColumnItem;
}

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceController.prototype.addParentKeyColumn = function(pkcData) {
    var caption = ParentKeyColumnController.prototype.getCaption(pkcData);
    var itemParentKeyColumn = this.itemParentKeyColumns.addItem(caption);
    var parentKeyColumn = new ParentKeyColumn(pkcData,this.model);
    itemParentKeyColumn.ctrl = new ParentKeyColumnController(parentKeyColumn,itemParentKeyColumn);
    return itemParentKeyColumn;
}

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
}

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
}

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
    });
}

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
    });
}

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSourceController.prototype.getPropList = function() {
    var list = this.model.data["@attributes"];
    var options = {};
    options["insertNewKey"] = ["true","false"];
    options["dumpFirstRowToParams"] = ["true","false"];
    return {list:list,options:options};
}



