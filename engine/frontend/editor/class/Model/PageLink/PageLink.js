'use strict';

QForms.inherit(PageLink,Model);

////////////////////////////////////////////////////////////////////////////////////////////////////
function PageLink(data) {
    Model.call(this,data);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageLink.prototype.setValue = function(name,value,callback) {
    //console.log(name + " = " + value);
    var args = {
        controller:"PageLink",
        action:"save",
        params:{
            pageLink:this.data["@attributes"].name,
            attr:name,
            value:value
        }
    };
    QForms.doHttpRequest(this,args,function(data) {
        this.data["@attributes"][name] = value;
        if (callback) {
            callback(data);
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageLink.prototype.moveUp = function(callback) {
    var args = {
        controller: 'PageLink',
        action    : 'moveUp',
        params    : {
            page:this.data["@attributes"].name
        }
    };
    QForms.doHttpRequest(this, args, function(data){
        if (callback) {
            callback(data);
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageLink.prototype.moveDown = function(callback) {
    var args = {
        controller: 'PageLink',
        action    : 'moveDown',
        params    : {
            page:this.data["@attributes"].name
        }
    };
    QForms.doHttpRequest(this, args, function(data){
        if (callback) {
            callback(data);
        }
    });
};