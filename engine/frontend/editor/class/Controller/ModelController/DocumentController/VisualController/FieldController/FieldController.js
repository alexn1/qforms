"use strict"

QForms.inherit(FieldController,VisualController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function FieldController(model,item) {
    VisualController.call(this,model);
    this.item = item;
}

////////////////////////////////////////////////////////////////////////////////////////////////////
FieldController.prototype.getActions = function() {
    return [
        {"action":"changeClass","caption":"Change Class"},
        {"action":"","caption":"-"},
        {"action":"delete","caption":"Delete"}
    ];
}

////////////////////////////////////////////////////////////////////////////////////////////////////
FieldController.prototype.doAction = function(action) {
    switch (action) {
        case "delete":
            this.delete();
            break;
        case "changeClass":
            this.actionChangeClass();
            break;
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////
FieldController.prototype.actionChangeClass = function() {
    var self = this;
    Field.prototype.getView("chnageClass.html", function(result) {
        $(document.body).append(result.view);
        $('#modal').on('hidden.bs.modal',function(){
            $(this).remove();
        });
        $("#modal button[name='change']").click(function() {
            var fieldClass = $("#modal select[id='fieldClass']").val();
            if (self.model.data["@class"] !== fieldClass) {
                self.model.changeClass({class:fieldClass},function(data) {
                    //console.log(data);
                    self.item.setCaption(FieldController.prototype.getCaption(self.model.data));
                    EditorController.editorController.fillGrid(self);
                });
            }
            $("#modal").modal("hide");
        });
        $("#modal").modal("show");
    });
}

////////////////////////////////////////////////////////////////////////////////////////////////////
FieldController.prototype.getCaption = function(fieldData) {
    var caption = "<span class='blue'>{class}:</span> <span class='green'>{name}</span>"
        .replace("{name}",fieldData["@attributes"].name)
        .replace("{class}",fieldData["@class"]);
    return caption;
}

////////////////////////////////////////////////////////////////////////////////////////////////////
FieldController.prototype.getPropList = function() {
    var list = this.model.data["@attributes"];
    var options = {};
    options["isVisible"] = ["true","false"];
    options["readOnly"] = ["true","false"];
    options["notNull"] = ["true","false"];
    options["align"] = ["left","right"];
    return {list:list,options:options};
}