'use strict';

QForms.inherit(Application,Model);

////////////////////////////////////////////////////////////////////////////////////////////////////
function Application(data) {
    Model.call(this,data);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Application.prototype.setValue = function(name,value,callback) {
    //console.log(name + " = " + value);
    var args = {
        controller:"Application",
        action:"save",
        params:{
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
Application.prototype.newPage = function(params,callback) {
    params['menu'] = (params['startup'] === "true") ? "Menu" : "";
    var args = {
        controller:"Page",
        action:"_new",
        params:params
    };
    QForms.doHttpRequest(this,args,function(data){
        if (callback) {
            callback(data.page,data.pageLink);
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Application.prototype.newDatabase = function(params,callback) {
    var args = {
        controller:"Database",
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
Application.prototype.getView = function(view,callback) {
    var args = {
        controller:"Application",
        action:"getView",
        params:{
            app:this.data["@attributes"].name,
            view:view
        }
    };
    QForms.doHttpRequest(this,args,function(data){
        callback(data);
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Application.prototype.saveView = function(text,view) {
    var args = {
        controller:"Application",
        action:"saveView",
        params:{
            app:this.data["@attributes"].name,
            view:view,
            text:text
        }
    };
    QForms.doHttpRequest(this,args,function(data){});
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Application.prototype.saveController = function(text) {
    var args = {
        controller:"Application",
        action:"saveController",
        params:{
            app:this.data["@attributes"].name,
            text:text
        }
    };
    QForms.doHttpRequest(this,args,function(data){});
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Application.prototype.createView = function(callback) {
    var args = {
        controller:"Application",
        action:"createView",
        params:{
            app:this.data["@attributes"].name
        }
    };
    QForms.doHttpRequest(this,args,function(data){
        callback(data);
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Application.prototype.createController = function(callback) {
    var args = {
        controller:"Application",
        action:"createController",
        params:{
            app:this.data["@attributes"].name
        }
    };
    QForms.doHttpRequest(this,args,function(data){
        callback(data);
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Application.prototype.newDataSource = function(params, callback) {
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
};