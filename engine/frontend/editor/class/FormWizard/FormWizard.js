"use strict"

////////////////////////////////////////////////////////////////////////////////////////////////////
function FormWizard(params) {
    this.params = params;
}

////////////////////////////////////////////////////////////////////////////////////////////////////
FormWizard.prototype.getKeyColumns = function() {
    var keyColumns = {};
    for (var i=0;i<this.params.tableColumns.length;i++) {
        var column = this.params.tableColumns[i];
        if (column.COLUMN_KEY === 'PRI') {
            keyColumns[column.COLUMN_NAME] = {
                name:column.COLUMN_NAME
            };
        }
    }
    return keyColumns;
}

////////////////////////////////////////////////////////////////////////////////////////////////////
FormWizard.prototype.getColumns = function() {
    var columns = [];
    for (var i=0;i<this.params.tableColumns.length;i++) {
        var column = this.params.tableColumns[i];
        columns.push(column.COLUMN_NAME);
    }
    return columns;
}

////////////////////////////////////////////////////////////////////////////////////////////////////
FormWizard.prototype.getQuery = function() {
    var query;
    var columns = this.getColumns();

    switch (this.params.className) {
        case "TableForm":
        case "TreeForm":
            query = "select {columns} from `{table}`"
                .replace("{table}",this.params.tableName)
                .replace("{columns}",columns.toString());
            break;
        case "RowForm":
            query = "select {columns} from `{table}` where id = {key}"
                .replace("{table}",this.params.tableName)
                .replace("{columns}",columns.toString());
            break;
    }
    return query;
}

////////////////////////////////////////////////////////////////////////////////////////////////////
FormWizard.prototype.getDataSources = function() {
    return {
        default:{
            class:"SqlDataSource",
            name:"default",
            database:this.params.databaseName,
            table:this.params.tableName,
            query:this.getQuery(),
            keyColumns: this.getKeyColumns()
        }
    };
}

////////////////////////////////////////////////////////////////////////////////////////////////////
FormWizard.prototype.getField = function(column) {
    var field = {
        class:"TextBoxField",
        name:column.COLUMN_NAME
    };
    if (column.COLUMN_COMMENT) {
        field.caption = column.COLUMN_COMMENT;
    }
    if (column.COLUMN_KEY === 'PRI') {
        field.readOnly = "true";
    }
    return field;
}

////////////////////////////////////////////////////////////////////////////////////////////////////
FormWizard.prototype.getFields = function() {
    var fields = {};
    for (var i=0;i<this.params.tableColumns.length;i++) {
        var column = this.params.tableColumns[i];
        fields[column.COLUMN_NAME] = this.getField(column);
    }
    return fields;
}

////////////////////////////////////////////////////////////////////////////////////////////////////
FormWizard.prototype.getFormParams = function() {
    return {
        name:this.params.formName,
        caption:this.params.formCaption,
        class:this.params.className,
        dataSources:this.getDataSources(),
        fields:this.getFields()
    };
}