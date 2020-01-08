'use strict';

////////////////////////////////////////////////////////////////////////////////////////////////////
function FormWizard(params) {
    var self = this;
    self.params = params;
}

////////////////////////////////////////////////////////////////////////////////////////////////////
FormWizard.prototype.getKeyColumns = function() {
    var self = this;
    var keyColumns = {};
    for (var i = 0; i < self.params.tableColumns.length; i++) {
        var column = self.params.tableColumns[i];
        if (column.COLUMN_KEY === 'PRI') {
            keyColumns[column.COLUMN_NAME] = {
                name: column.COLUMN_NAME
            };
        }
    }
    return keyColumns;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FormWizard.prototype.getColumns = function() {
    var self = this;
    var columns = [];
    for (var i = 0; i < self.params.tableColumns.length; i++) {
        var column = self.params.tableColumns[i];
        columns.push(column.COLUMN_NAME);
    }
    return columns;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FormWizard.prototype.getQuery = function() {
    var self = this;
    var query;
    var columns = self.getColumns();
    switch (self.params.className) {
        case 'TableForm':
        case 'TreeForm':
            query = 'select\n{columns}\nfrom `{table}`\nlimit {offset}, {limit}'
                .replace('{table}',   self.params.tableName)
                .replace('{columns}', columns.map(function (column) {return '    `' + column + '`';}).join(',\n'));
            break;
        case 'RowForm':
            query = 'select\n{columns}\nfrom `{table}`\nwhere id = {key}'
                .replace('{table}',   self.params.tableName)
                .replace('{columns}', columns.map(function (column) {return '    `' + column + '`';}).join(',\n'));
            break;
    }
    return query;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FormWizard.prototype.getCountQuery = function() {
    var self = this;
    var countQuery;
    switch (self.params.className) {
        case 'TableForm':
        case 'TreeForm':
            countQuery = 'select count(*) from `{table}`'.replace('{table}', self.params.tableName);
            break;
        case 'RowForm':
            countQuery = '';
            break;
    }
    return countQuery;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FormWizard.prototype.getDataSources = function() {
    var self = this;
    return {
        default:{
            class     : 'SqlDataSource',
            name      : 'default',
            database  : self.params.databaseName,
            table     : self.params.tableName,
            query     : self.getQuery(),
            limit     : self.params.className === 'TableForm' || self.params.className === 'TreeForm' ? '100' : '',
            countQuery: self.getCountQuery(),
            keyColumns: self.getKeyColumns()
        }
    };
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FormWizard.prototype.getField = function(column) {
    var self = this;
    var field = {
        class: 'TextBoxField',
        name : column.COLUMN_NAME
    };
    if (column.COLUMN_COMMENT) {
        field.caption = column.COLUMN_COMMENT;
    }
    if (column.COLUMN_KEY === 'PRI') {
        field.readOnly = 'true';
    }
    return field;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FormWizard.prototype.getFields = function() {
    var self = this;
    var fields = {};
    for (var i = 0; i < self.params.tableColumns.length; i++) {
        var column = self.params.tableColumns[i];
        fields[column.COLUMN_NAME] = self.getField(column);
    }
    return fields;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FormWizard.prototype.getFormParams = function() {
    var self = this;
    return {
        name       : self.params.formName,
        caption    : self.params.formCaption,
        class      : self.params.className,
        dataSources: self.getDataSources(),
        fields     : self.getFields()
    };
};