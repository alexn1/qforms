'use strict';

QForms.inherits(DataSource, Model);

////////////////////////////////////////////////////////////////////////////////////////////////////
function DataSource(data, parent) {
    var self = this;
    Model.call(self, data);
    self.parent = parent;
}

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.create = function(parent, params) {
    var self = this;
    if (parent instanceof Form) {
        var form = parent;
        params['page']  = form.page.pageLink.data['@attributes'].fileName;
        params['form']  = form.data['@attributes'].name;
    }
    if (parent instanceof Page) {
        var page = parent;
        params['page']  = page.pageLink.data['@attributes'].fileName;
    }
    var args = {
        controller: 'DataSource',
        action    : '_new',
        params    : params
    };
    return QForms.doHttpRequest(args).then(function (data) {
        return data;
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.setValue = function(name, value) {
    var self = this;
    //console.log(name + ' = ' + value);
    var args = {
        controller: 'DataSource',
        action    : 'save',
        params    : {
            dataSource: self.data['@attributes'].name,
            attr      : name,
            value     : value
        }
    };
    if (self.parent instanceof Page) {
        args.params.pageFileName = self.parent.pageLink.data['@attributes'].fileName;
    }
    if (self.parent instanceof Form) {
        args.params.form         = self.parent.data['@attributes'].name;
        args.params.pageFileName = self.parent.page.pageLink.data['@attributes'].fileName;
    }
    return QForms.doHttpRequest(args).then(function (data) {
        self.data['@attributes'][name] = value;
        return data;
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.delete = function() {
    var self = this;
    var args = {
        controller: 'DataSource',
        action    : 'delete',
        params    : {
            dataSource: self.data['@attributes'].name
        }
    };
    if (self.parent instanceof Page) {
        args.params.page = self.parent.pageLink.data['@attributes'].fileName;
    }
    if (self.parent instanceof Form) {
        args.params.form = self.parent.data['@attributes'].name;
        args.params.page = self.parent.page.pageLink.data['@attributes'].fileName;
    }
    return QForms.doHttpRequest(args).then(function (data) {
        return data;
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.moveUp = function() {
    var self = this;
    var args = {
        controller: 'DataSource',
        action    : 'moveUp',
        params    : {
            dataSource: self.data['@attributes'].name
        }
    };
    if (self.parent instanceof Page) {
        args.params.page = self.parent.pageLink.data['@attributes'].fileName;
    }
    if (self.parent instanceof Form) {
        args.params.form = self.parent.data['@attributes'].name;
        args.params.page = self.parent.page.pageLink.data['@attributes'].fileName;
    }
    return QForms.doHttpRequest(args).then(function (data) {
        return data;
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.moveDown2 = function() {
    var self = this;
    var args = {
        controller: 'DataSource',
        action    : 'moveDown',
        params    : {
            dataSource: self.data['@attributes'].name
        }
    };
    if (self.parent instanceof Page) {
        args.params.page = self.parent.pageLink.data['@attributes'].fileName;
    }
    if (self.parent instanceof Form) {
        args.params.form = self.parent.data['@attributes'].name;
        args.params.page = self.parent.page.pageLink.data['@attributes'].fileName;
    }
    return QForms.doHttpRequest(args).then(function (data) {
        return data;
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.newKeyColumn2 = function(name) {
    var self = this;
    var args = {
        controller: 'KeyColumn',
        action    : '_new',
        params    : {
            dataSource: self.data['@attributes'].name,
            name      : name
        }
    };
    if (self.parent instanceof Form) {
        args.params.page = self.parent.page.pageLink.data['@attributes'].fileName;
        args.params.form = self.parent.data['@attributes'].name;
    }
    if (self.parent instanceof Page) {
        args.params.page = self.parent.pageLink.data['@attributes'].fileName;
    }
    return QForms.doHttpRequest(args).then(function (data) {
        return data;
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.newParentKeyColumn2 = function(name) {
    var self = this;
    var args = {
        controller: 'ParentKeyColumn',
        action    : '_new',
        params    : {
            page      : self.parent.page.pageLink.data['@attributes'].fileName,
            form      : self.parent.data['@attributes'].name,
            dataSource: self.data['@attributes'].name,
            name      : name
        }
    };
    return QForms.doHttpRequest(args).then(function (data) {
        return data;
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.getView = function(view) {
    var self = this;
    var args = {
        controller: 'DataSource',
        action    : 'getView',
        params    : {
            dataSource: (self instanceof DataSource) ? self.data['@attributes'].name : undefined,
            view      : view
        }
    };
    if (self.parent instanceof Page) {
        args.params.pageFileName = (self instanceof DataSource) ? self.parent.pageLink.data['@attributes'].fileName : undefined;
    }
    if (self.parent instanceof Form) {
        args.params.pageFileName = (self instanceof DataSource) ? self.parent.page.pageLink.data['@attributes'].fileName : undefined;
        args.params.form         = (self instanceof DataSource) ? self.parent.data['@attributes'].name                   : undefined;
    }
    return QForms.doHttpRequest(args).then(function (data) {
        return data;
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.saveController = function(text) {
    var self = this;
    var args = {
        controller: 'DataSource',
        action    : 'saveController',
        params    : {
            dataSource: self.data['@attributes'].name,
            text      : text
        }
    };
    if (self.parent instanceof Page) {
        args.params.pageFileName = self.parent.pageLink.data['@attributes'].fileName;
    }
    if (self.parent instanceof Form) {
        args.params.pageFileName = self.parent.page.pageLink.data['@attributes'].fileName;
        args.params.form         = self.parent.data['@attributes'].name;
    }
    return QForms.doHttpRequest(args).then(function (data) {
        return data;
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.createController = function() {
    var self = this;
    var args = {
        controller: 'DataSource',
        action    : 'createController',
        params    : {
            page        : self.parent.page.data['@attributes'].name,
            pageFileName: self.parent.page.pageLink.data['@attributes'].fileName,
            form        : self.parent.data['@attributes'].name,
            dataSource  : self.data['@attributes'].name
        }
    };
    return QForms.doHttpRequest(args).then(function (data) {
        return data;
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DataSource.prototype.getFullName = function() {
    var self = this;
    if (self.parent instanceof Form) {
        return [self.parent.parent.name, self.parent.name, self.name].join('.');
    } else if (self.parent instanceof Page) {
        return [self.parent.name, self.name].join('.');
    } else if (self.parent instanceof Application) {
        return self.name;
    }
};