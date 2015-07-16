'use strict';

QForms.inherit(Param,Model);

////////////////////////////////////////////////////////////////////////////////////////////////////
function Param(data,database) {
    Model.call(this,data);
    this.database = database;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Param.prototype.setValue = function(name,value,callback) {
    //console.log(name + ' = ' + value);
    var args = {
        controller:'Param',
        action:'save',
        params:{
            database:this.database.data['@attributes'].name,
            param:this.data['@attributes'].name,
            attr:name,
            value:value
        }
    };
    QForms.doHttpRequest(this,args,function(data) {
        this.data['@attributes'][name] = value;
        if (callback) {
            callback(data);
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Param.prototype.delete = function(callback) {
    var args = {
        controller:'Param',
        action:'delete',
        params:{
            database:this.database.data['@attributes'].name,
            param:this.data['@attributes'].name
        }
    };
    QForms.doHttpRequest(this,args,function(data) {
        if (callback) {
            callback(data);
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Param.prototype.getView = function(view,callback) {
    var args = {
        controller:'Param',
        action:'getView',
        params:{
            view:view
        }
    };
    QForms.doHttpRequest(this,args,function(data) {
        callback(data);
    });
};