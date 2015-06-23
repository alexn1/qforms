'use strict';

QForms.inherit(Page,Model);

////////////////////////////////////////////////////////////////////////////////////////////////////
function Page(data,pageLink) {
    Model.call(this,data);
    this.pageLink = pageLink;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Page.prototype.setValue = function(name,value,callback) {
    //console.log(name + " = " + value);
    var args = {
        controller:"Page",
        action:"save",
        params:{
            fileName:this.pageLink.data["@attributes"].fileName,
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
Page.prototype.delete = function(callback) {
    var args = {
        controller:"Page",
        action:"delete",
        params:{
            page:this.data["@attributes"].name
        }
    };
    QForms.doHttpRequest(this,args,function(data){
        if (callback) {
            callback(data);
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Page.prototype.newForm = function(params,callback) {
    params["pageFileName"] = this.pageLink.data["@attributes"].fileName;
    var args = {
        controller:"Form",
        action:"_new",
        params:params
    };
    QForms.doHttpRequest(this,args,function(data){
        if (callback) {
            callback(data);
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Page.prototype.getView = function(view,callback) {
    var args = {
        controller:"Page",
        action:"getView",
        params:{
            view:view,
            page: this.data !== undefined ? this.data["@attributes"].name : null
        }
    };
    QForms.doHttpRequest(this,args,function(data){
        callback(data);
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Page.prototype.saveView = function(text,view) {
    var args = {
        controller:"Page",
        action:"saveView",
        params:{
            page:this.data["@attributes"].name,
            view:view,
            text:text
        }
    };
    QForms.doHttpRequest(this,args,function(data){

    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Page.prototype.saveController = function(text) {
    var args = {
        controller:"Page",
        action:"saveController",
        params:{
            page:this.data["@attributes"].name,
            text:text
        }
    };
    QForms.doHttpRequest(this,args,function(data){

    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Page.prototype.createView = function(callback) {
    var args = {
        controller:"Page",
        action:"createView",
        params:{
            page:this.data["@attributes"].name
        }
    };
    QForms.doHttpRequest(this,args,function(data) {
        callback(data);
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Page.prototype.createController = function(callback) {
    var args = {
        controller:"Page",
        action:"createController",
        params:{
            page:this.data["@attributes"].name
        }
    };
    QForms.doHttpRequest(this,args,function(data) {
        callback(data);
    });
};