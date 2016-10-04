'use strict';

QForms.inherits(PageLink, Model);

////////////////////////////////////////////////////////////////////////////////////////////////////
function PageLink(data, parent) {
    var self = this;
    Model.call(self, data);
    self.parent      = parent;
    self.application = parent;
}

////////////////////////////////////////////////////////////////////////////////////////////////////
PageLink.prototype.setValue = function(name, value, callback) {
    var self = this;
    //console.log(name + ' = ' + value);
    var args = {
        controller: 'PageLink',
        action    : 'save',
        params    : {
            pageLink: self.data['@attributes'].name,
            attr    : name,
            value   : value
        }
    };
    QForms.doHttpRequest(self, args, function (data) {
        self.data['@attributes'][name] = value;
        if (callback) {
            callback(data);
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageLink.prototype.moveUp = function(callback) {
    var self = this;
    var args = {
        controller: 'PageLink',
        action    : 'moveUp',
        params    : {
            page: self.data['@attributes'].name
        }
    };
    QForms.doHttpRequest(self, args, function (data) {
        if (callback) {
            callback(data);
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageLink.prototype.moveDown = function(callback) {
    var self = this;
    var args = {
        controller: 'PageLink',
        action    : 'moveDown',
        params    : {
            page: self.data['@attributes'].name
        }
    };
    QForms.doHttpRequest(self, args, function (data) {
        if (callback) {
            callback(data);
        }
    });
};