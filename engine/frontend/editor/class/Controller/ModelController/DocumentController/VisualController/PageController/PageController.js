"use strict"

QForms.inherit(PageController,VisualController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function PageController(model,item,pageLink) {
    VisualController.call(this,model);
    this.item = item;
    this.pageLink = pageLink;
    this.itemForms = null;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageController.prototype.createTree = function(callback) {
    // forms
    this.itemForms = this.item.addItem("Forms");
    if (this.model.data.forms) {
        for (var name in this.model.data.forms) {
            var formData = this.model.data.forms[name];
            this.addFormItem(formData);
        };
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageController.prototype.addFormItem = function(formData) {
    var caption = FormController.prototype.getCaption(formData);
    var itemForm = this.itemForms.addItem(caption);
    var form = new Form(formData,this.model);
    itemForm.ctrl = new FormController(form,itemForm);
    itemForm.ctrl.createTree();
    return itemForm;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageController.prototype.getActions = function() {
    return [
        {"action":"newForm","caption":"New Form"},
        //{"action":"newDataSource","caption":"New Data Source"},
        {"action":"","caption":"-"},
        {"action":"delete","caption":"Delete"}
    ];
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageController.prototype.doAction = function(action) {
    switch (action) {
        case "newForm":
            this.actionNewForm();
            break;
        case "delete":
            this.delete();
            break;
        default:
            console.log(action);
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageController.prototype.actionNewForm = function() {
    var self = this;
    Form.prototype.getView("new.html", function(result) {
        $(document.body).append(result.view);
        $('#myModal').on('hidden.bs.modal',function(e){$(this).remove();});
        $("#myModal button[name='create']").click(function() {
            var params = {
                name:$("#myModal input[id='name']").val(),
                caption:$("#myModal input[id='caption']").val(),
                class:$("#myModal select[id='formClass']").val()
            };
            self.model.newForm(params,function(formData) {
                self.addFormItem(formData).select();
                $("#myModal").modal("hide");
            });
        });
        $("#myModal").modal("show");
        $("#myModal input[id='name']").focus();
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageController.prototype.getPropList = function() {
    var list = {};
    var options = {};
    for (var name in this.model.data["@attributes"]) {
        var value = this.model.data["@attributes"][name];
        list[name] = value;
    }
    list["menu"]    = this.pageLink.data["@attributes"]["menu"];
    list["startup"] = this.pageLink.data["@attributes"]["startup"];
    options[["startup"]] = ["true","false"];
    return {list:list,options:options};
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageController.prototype.setProperty = function(name,value) {
    if (name === "startup" || name === "menu") {
        this.pageLink.setValue(name,value);
    } else  {
        ModelController.prototype.setProperty.call(this,name,value);
    }
};

