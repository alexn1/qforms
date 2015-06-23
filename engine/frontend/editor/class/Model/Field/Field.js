'use strict';

QForms.inherit(Field,Model);

////////////////////////////////////////////////////////////////////////////////////////////////////
function Field(data,form) {
    Model.call(this,data);
    this.form = form;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Field.prototype.setValue = function(name,value,callback) {
    //console.log(name + " = " + value);
    var args = {
        controller:"Field",
        action:"save",
        params:{
            pageFileName:this.form.page.pageLink.data["@attributes"].fileName,
            form:this.form.data["@attributes"].name,
            field:this.data["@attributes"].name,
            attr:name,
            value:value
        }
    };
    QForms.doHttpRequest(this,args,function(data){
        this.data["@attributes"][name] = value;
        if (callback) {
            callback(data);
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Field.prototype.delete = function(callback) {
    var args = {
        controller : 'Field',
        action     : 'delete',
        params     : {
            pageFileName:this.form.page.pageLink.data["@attributes"].fileName,
            form        :this.form.data["@attributes"].name,
            field       :this.data["@attributes"].name
        }
    };
    QForms.doHttpRequest(this,args, function(data) {
        if (callback) {
            callback(data);
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Field.prototype.getView = function(view,callback) {
    var args = {
        controller:"Field",
        action:"getView",
        params:{
            view:view,
            page: this.data !== undefined ? this.form.page.data["@attributes"].name : null,
            form: this.data !== undefined ? this.form.data["@attributes"].name : null,
            field: this.data !== undefined ? this.data["@attributes"].name : null
        }
    };
    QForms.doHttpRequest(this,args,function(data){
        callback(data);
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Field.prototype.saveView = function(text,view) {
    var args = {
        controller:"Field",
        action:"saveView",
        params:{
            page:this.form.page.data["@attributes"].name,
            form:this.form.data["@attributes"].name,
            field:this.data["@attributes"].name,
            view:view,
            text:text
        }
    };
    QForms.doHttpRequest(this,args,function(data){});
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Field.prototype.saveController = function(text) {
    var args = {
        controller:"Field",
        action:"saveController",
        params:{
            page:this.form.page.data["@attributes"].name,
            form:this.form.data["@attributes"].name,
            field:this.data["@attributes"].name,
            text:text
        }
    };
    QForms.doHttpRequest(this,args,function(data){});
};


////////////////////////////////////////////////////////////////////////////////////////////////////
Field.prototype.createView = function(callback) {
    var args = {
        controller:"Field",
        action:"createView",
        params:{
            page:this.form.page.data["@attributes"].name,
            form:this.form.data["@attributes"].name,
            field:this.data["@attributes"].name,
            class:this.data["@class"]
        }
    };
    QForms.doHttpRequest(this,args,function(data){
        callback(data);
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Field.prototype.createController = function(callback) {
    var args = {
        controller:"Field",
        action:"createController",
        params:{
            page:this.form.page.data["@attributes"].name,
            form:this.form.data["@attributes"].name,
            field:this.data["@attributes"].name,
            class:this.data["@class"]
        }
    };
    QForms.doHttpRequest(this,args,function(data){
        callback(data);
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Field.prototype.changeClass = function(params,callback) {
    params["page"] = this.form.page.data["@attributes"].name;
    params["form"] = this.form.data["@attributes"].name;
    params["field"] = this.data["@attributes"].name;
    var args = {
        controller:"Field",
        action:"changeClass",
        params:params
    };
    var self = this;
    QForms.doHttpRequest(this,args,function(data) {
        this.data = data;
        callback(data);
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Field.prototype.moveUp = function(callback) {
    var args = {
        controller : 'Field',
        action     : 'moveUp',
        params     : {
            pageFileName:this.form.page.pageLink.data["@attributes"].fileName,
            form        :this.form.data["@attributes"].name,
            field       :this.data["@attributes"].name
        }
    };
    QForms.doHttpRequest(this, args, callback);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Field.prototype.moveDown = function(callback) {
    var args = {
        controller : 'Field',
        action     : 'moveDown',
        params     : {
            pageFileName:this.form.page.pageLink.data["@attributes"].fileName,
            form        :this.form.data["@attributes"].name,
            field       :this.data["@attributes"].name
        }
    };
    QForms.doHttpRequest(this, args, callback);
};