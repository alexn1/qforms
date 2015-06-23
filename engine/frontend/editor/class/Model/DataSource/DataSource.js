'use strict';

QForms.inherit(DataSource,Model);

////////////////////////////////////////////////////////////////////////////////////////////////////
function DataSource(data, parent) {
    Model.call(this, data);
    this.parent = parent;
};


////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.create = function(parent, params, callback) {
    if (parent instanceof Form) {
        var form = parent;
        params["page"]  = form.page.pageLink.data["@attributes"].fileName;
        params["form"]  = form.data["@attributes"].name;
    }
    if (parent instanceof Page) {
        var page = parent;
        params["page"]  = page.pageLink.data["@attributes"].fileName;
    }
    var args = {
        controller:"DataSource",
        action:"_new",
        params:params
    };
    QForms.doHttpRequest(this, args, function(data) {
        if (callback) {
            callback(data);
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.setValue = function(name, value, callback) {
    //console.log(name + " = " + value);
    var args = {
        controller:"DataSource",
        action:"save",
        params:{
            dataSource:this.data["@attributes"].name,
            attr:name,
            value:value
        }
    };
    if (this.parent instanceof Page) {
        args.params.pageFileName = this.parent.pageLink.data["@attributes"].fileName;
    }
    if (this.parent instanceof Form) {
        args.params.form = this.parent.data["@attributes"].name;
        args.params.pageFileName = this.parent.page.pageLink.data["@attributes"].fileName;
    }
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
            dataSource:this.data["@attributes"].name
        }
    };
    if (this.parent instanceof Page) {
        args.params.page = this.parent.pageLink.data["@attributes"].fileName;
    }
    if (this.parent instanceof Form) {
        args.params.form = this.parent.data["@attributes"].name;
        args.params.page = this.parent.page.pageLink.data["@attributes"].fileName;
    }
    QForms.doHttpRequest(this, args, function(data) {
        if (callback) {
            callback(data);
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.newKeyColumn = function(name, callback) {
    var args = {
        controller:"KeyColumn",
        action:"_new",
        params:{
            dataSource:this.data["@attributes"].name,
            name:name
        }
    };
    if (this.parent instanceof Form) {
        args.params.page = this.parent.page.pageLink.data["@attributes"].fileName;
        args.params.form = this.parent.data["@attributes"].name;
    }
    if (this.parent instanceof Page) {
        args.params.page = this.parent.pageLink.data["@attributes"].fileName;
    }
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