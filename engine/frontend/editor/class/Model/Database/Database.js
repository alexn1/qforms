'use strict';

QForms.inherit(Database,Model);

////////////////////////////////////////////////////////////////////////////////////////////////////
function Database(data) {
    Model.call(this,data);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Database.prototype.setValue = function(name,value,callback) {
    //console.log(name + " = " + value);
    var args = {
        controller:"Database",
        action:"save",
        params:{
            database:this.data["@attributes"].name,
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
Database.prototype.delete = function(callback) {
    var args = {
        controller:"Database",
        action:"delete",
        params:{
            database:this.data["@attributes"].name
        }
    };
    QForms.doHttpRequest(this,args,function(data){
        if (callback) {
            callback(data);
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Database.prototype.newParam = function(name,callback) {
    var args = {
        controller:"Param",
        action:"_new",
        params:{
            database:this.data["@attributes"].name,
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
Database.prototype.getView = function(view,callback) {
    var args = {
        controller:"Database",
        action:"getView",
        params:{
            view:view,
            database: this.data !== undefined ? this.data["@attributes"].name : null
        }
    };
    QForms.doHttpRequest(this,args,function(data){
        callback(data);
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Database.prototype.getTableInfo = function(table,callback) {
    var args = {
        controller:"Database",
        action:"getTableInfo",
        params:{
            database: this.data !== undefined ? this.data["@attributes"].name : null,
            table:table
        }
    };
    QForms.doHttpRequest(this,args,function(result){
        callback(result);
    });
};