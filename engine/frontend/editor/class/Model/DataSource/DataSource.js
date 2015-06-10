"use strict"

QForms.inherit(DataSource,Model);

////////////////////////////////////////////////////////////////////////////////////////////////////
function DataSource(data,parent) {
    Model.call(this,data);
    this.parent = parent;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.setValue = function(name,value,callback) {
    //console.log(name + " = " + value);
    var args = {
        controller:"DataSource",
        action:"save",
        params:{
            form:this.parent.data["@attributes"].name,
            pageFileName:this.parent.page.pageLink.data["@attributes"].fileName,
            dataSource:this.data["@attributes"].name,
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
DataSource.prototype.delete = function(callback) {
    var args = {
        controller:"DataSource",
        action:"delete",
        params:{
            page:this.parent.page.pageLink.data["@attributes"].fileName,
            form:this.parent.data["@attributes"].name,
            dataSource:this.data["@attributes"].name
        }
    };
    QForms.doHttpRequest(this,args,function(data){
        if (callback) {
            callback(data);
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.newKeyColumn = function(name,callback) {
    var args = {
        controller:"KeyColumn",
        action:"_new",
        params:{
            page:this.parent.page.pageLink.data["@attributes"].fileName,
            form:this.parent.data["@attributes"].name,
            dataSource:this.data["@attributes"].name,
            name:name
        }
    };
    QForms.doHttpRequest(this,args,function(data){
        if (callback) {
            callback(data);
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.newParentKeyColumn = function(name,callback) {
    var args = {
        controller:"ParentKeyColumn",
        action:"_new",
        params:{
            page:this.parent.page.pageLink.data["@attributes"].fileName,
            form:this.parent.data["@attributes"].name,
            dataSource:this.data["@attributes"].name,
            name:name
        }
    };
    QForms.doHttpRequest(this,args,function(data){
        if (callback) {
            callback(data);
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.getView = function(view,callback) {
    var args = {
        controller:"DataSource",
        action:"getView",
        params:{
            view:view
        }
    };
    QForms.doHttpRequest(this,args,function(data){
        callback(data);
    });
};