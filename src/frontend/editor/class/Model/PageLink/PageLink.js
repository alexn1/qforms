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
PageLink.prototype.setValue = function(name, value) {
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
    return QForms.doHttpRequest(args).then(function (data) {
        self.data['@attributes'][name] = value;
        return data;
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageLink.prototype.moveUp = function() {
    var self = this;
    var args = {
        controller: 'PageLink',
        action    : 'moveUp',
        params    : {
            page: self.data['@attributes'].name
        }
    };
    return QForms.doHttpRequest(args).then(function (data) {
        return data;
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
PageLink.prototype.moveDown = function() {
    var self = this;
    var args = {
        controller: 'PageLink',
        action    : 'moveDown',
        params    : {
            page: self.data['@attributes'].name
        }
    };
    return QForms.doHttpRequest(args).then(function (data) {
        return data;
    });
};