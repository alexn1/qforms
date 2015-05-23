"use strict"

QForms.inherit(Form,Model);

////////////////////////////////////////////////////////////////////////////////////////////////////
function Form(data,page) {
    Model.call(this,data);
    this.page = page;
}

////////////////////////////////////////////////////////////////////////////////////////////////////
Form.prototype.setValue = function(name,value,callback) {
    //console.log(name + " = " + value);
    var args = {
        controller:"Form",
        action:"save",
        params:{
            pageFileName:this.page.pageLink.data["@attributes"].fileName,
            form:this.data["@attributes"].name,
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
}

////////////////////////////////////////////////////////////////////////////////////////////////////
Form.prototype.delete = function(callback) {
    var args = {
        controller:"Form",
        action:"delete",
        params:{
            pageFileName:this.page.pageLink.data["@attributes"].fileName,
            form:this.data["@attributes"].name
        }
    };
    QForms.doHttpRequest(this,args,function(data){
        if (callback) {
            callback(data);
        }
    });
}

////////////////////////////////////////////////////////////////////////////////////////////////////
Form.prototype.newField = function(params,callback) {
    params["pageFileName"] = this.page.pageLink.data["@attributes"].fileName;
    params["form"] = this.data["@attributes"].name;
    var args = {
        controller:"Field",
        action:"_new",
        params:params
    };
    QForms.doHttpRequest(this,args,function(data){
        if (callback) {
            callback(data);
        }
    });
}

////////////////////////////////////////////////////////////////////////////////////////////////////
Form.prototype.newControl = function(params,callback) {
    params["pageFileName"] = this.page.pageLink.data["@attributes"].fileName;
    params["form"] = this.data["@attributes"].name;
    var args = {
        controller:"Control",
        action:"_new",
        params:params
    };
    QForms.doHttpRequest(this,args,function(data){
        if (callback) {
            callback(data);
        }
    });
}

////////////////////////////////////////////////////////////////////////////////////////////////////
Form.prototype.newDataSource = function(params,callback) {
    params["page"]  = this.page.pageLink.data["@attributes"].fileName;
    params["form"]  = this.data["@attributes"].name;
    var args = {
        controller:"DataSource",
        action:"_new",
        params:params
    };
    QForms.doHttpRequest(this,args,function(data){
        if (callback) {
            callback(data);
        }
    });
}

////////////////////////////////////////////////////////////////////////////////////////////////////
Form.prototype.getView = function(view,callback) {
    var args = {
        controller:"Form",
        action:"getView",
        params:{
            view:view,
            page: this.data !== undefined ? this.page.data["@attributes"].name : null,
            form: this.data !== undefined ? this.data["@attributes"].name : null
        }
    };
    QForms.doHttpRequest(this,args,function(data){
        callback(data);
    });
}

////////////////////////////////////////////////////////////////////////////////////////////////////
Form.prototype.saveView = function(text,view) {
    var args = {
        controller:"Form",
        action:"saveView",
        params:{
            page:this.page.data["@attributes"].name,
            form:this.data["@attributes"].name,
            view:view,
            text:text
        }
    };
    QForms.doHttpRequest(this,args,function(data){

    });
}

////////////////////////////////////////////////////////////////////////////////////////////////////
Form.prototype.saveController = function(text) {
    var args = {
        controller:"Form",
        action:"saveController",
        params:{
            page:this.page.data["@attributes"].name,
            form:this.data["@attributes"].name,
            text:text
        }
    };
    QForms.doHttpRequest(this,args,function(data) {

    });
}

////////////////////////////////////////////////////////////////////////////////////////////////////
Form.prototype.createView = function(callback) {
    var args = {
        controller:"Form",
        action:"createView",
        params:{
            page:this.page.data["@attributes"].name,
            form:this.data["@attributes"].name,
            class:this.data["@class"]
        }
    };
    QForms.doHttpRequest(this,args,function(data){
        callback(data);
    });
}

////////////////////////////////////////////////////////////////////////////////////////////////////
Form.prototype.createController = function(callback) {
    var args = {
        controller:"Form",
        action:"createController",
        params:{
            page:this.page.data["@attributes"].name,
            form:this.data["@attributes"].name,
            class:this.data["@class"]
        }
    };
    QForms.doHttpRequest(this,args,function(data){
        callback(data);
    });
}