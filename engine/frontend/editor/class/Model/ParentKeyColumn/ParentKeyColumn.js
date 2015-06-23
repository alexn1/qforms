'use strict';

QForms.inherit(ParentKeyColumn,Model);

////////////////////////////////////////////////////////////////////////////////////////////////////
function ParentKeyColumn(data,dataSource) {
    Model.call(this,data);
    this.dataSource = dataSource;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ParentKeyColumn.prototype.setValue = function(name,value,callback) {
    //console.log(name + " = " + value);
    var args = {
        controller:"ParentKeyColumn",
        action:"save",
        params:{
            form:this.dataSource.parent.data["@attributes"].name,
            pageFileName:this.dataSource.parent.page.pageLink.data["@attributes"].fileName,
            dataSource:this.dataSource.data["@attributes"].name,
            parentKeyColumn:this.data["@attributes"].name,
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
ParentKeyColumn.prototype.delete = function(callback) {
    var args = {
        controller:"ParentKeyColumn",
        action:"delete",
        params:{
            page:this.dataSource.parent.page.pageLink.data["@attributes"].fileName,
            form:this.dataSource.parent.data["@attributes"].name,
            dataSource:this.dataSource.data["@attributes"].name,
            parentKeyColumn:this.data["@attributes"].name
        }
    };
    QForms.doHttpRequest(this,args,function(data){
        if (callback) {
            callback(data);
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ParentKeyColumn.prototype.getView = function(view,callback) {
    var args = {
        controller:"ParentKeyColumn",
        action:"getView",
        params:{
            view:view
        }
    };
    QForms.doHttpRequest(this,args,function(data){
        callback(data);
    });
};
