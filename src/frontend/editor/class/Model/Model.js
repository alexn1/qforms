'use strict';

////////////////////////////////////////////////////////////////////////////////////////////////////
function Model(data) {
    var self = this;
    self.data = data;
    self.name = data['@attributes'].name;
}

////////////////////////////////////////////////////////////////////////////////////////////////////
Model.prototype.getFullName = function(splitter) {
    var self = this;
    var name;
    if (self.form) {
        name = ('{page}' + splitter + '{form}' + splitter + '{field}')
            .replace('{page}' , self.form.page.data['@attributes'].name)
            .replace('{form}' , self.form.data['@attributes'].name)
            .replace('{field}', self.data['@attributes'].name);

    } else if (self.page) {
        name = ('{page}' + splitter + '{form}')
            .replace('{page}', self.page.data['@attributes'].name)
            .replace('{form}', self.data['@attributes'].name);

    } else {
        name = self.data['@attributes'].name;
    }
    return name;
};