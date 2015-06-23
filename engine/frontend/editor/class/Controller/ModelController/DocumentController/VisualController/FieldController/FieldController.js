'use strict';

QForms.inherit(FieldController,VisualController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function FieldController(model,item) {
    VisualController.call(this,model);
    this.item = item;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FieldController.prototype.getActions = function() {
    return [
        {"action":"changeClass","caption":"Change Class"},
        {"action":"","caption":"-"},
        {"action":"moveUp","caption":"Move Up"},
        {"action":"moveDown","caption":"Move Down"},
        {"action":"","caption":"-"},
        {"action":"delete","caption":"Delete"}
    ];
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FieldController.prototype.doAction = function(action) {
    var self = this;
    switch (action) {
        case "changeClass":
            this.actionChangeClass();
            break;
        case "delete":
            this.delete();
            break;
        case 'moveUp':
            this.model.moveUp(function(data) {
                self.item.move(-1);
            });
            break;
        case 'moveDown':
            this.model.moveDown(function(data) {
                self.item.move(1);
            });
            break;
    }
};

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
        $("#modal input[id='fieldClass']").focus();
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FieldController.prototype.getCaption = function(fieldData) {
    var caption = "<span class='blue'>{class}:</span> <span class='green'>{name}</span>"
        .replace("{name}",fieldData["@attributes"].name)
        .replace("{class}",fieldData["@class"]);
    return caption;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FieldController.prototype.getPropList = function() {
    var list = this.model.data["@attributes"];
    var options = {};
    options["isVisible"] = ["true","false"];
    options["readOnly"] = ["true","false"];
    options["notNull"] = ["true","false"];
    options["align"] = ["left","right"];
    return {list:list,options:options};
};