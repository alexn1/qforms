'use strict';

class FormWizard {

    constructor(params) {
        console.log('FormWizard.constructor', params);
        this.params        = params;
        this.model         = params.model;
        this.databaseName  = this.model.database.name;
        this.tableName     = this.model.name;
        this.tableColumns  = Object.keys(this.model.data.columns).map(name => this.model.data.columns[name]['@attributes']);
    }

    static create(params) {
        console.log('FormWizard.create', params);
        switch (params.model.database.getClassName()) {
            case 'MySqlDatabase'     : return new MySqlFormWizard(params);
            case 'PostgreSqlDatabase': return new PostgreSqlFormWizard(params);
            default: throw new Error(`unknown database class: ${params.model.database.getClassName()}`);
        }
    }

    getDataSources() {
        return {
            default: {
                class     : 'SqlDataSource',
                name      : 'default',
                database  : this.databaseName,
                table     : this.tableName,
                limit     : this.params.className === 'TableForm' || this.params.className === 'TreeForm' ? '100' : '',
                // query     : this.getQuery(),
                countQuery: this.getCountQuery(),
                singleQuery: this.getSingleQuery(),
                multipleQuery: this.getMultipleQuery()
            }
        };
    }

    getFieldClass(column) {
        if (column.type === 'date') return 'DatePickerField';
        if (this.params.className === 'RowForm' && column.dbType === 'text') return 'TextAreaField';
        return 'TextBoxField';
    }

    getField(column) {
        console.log('FormWizard.getField', column);
        let field = {
            class: this.getFieldClass(column),
            name : column.name
        };
        if (column.caption) {
            field.caption = column.caption;
        }
        if (column.key === 'true') {
            if (column.auto === 'false') {
                field.notNull = 'true';
            }
        } else {
            if (column.nullable === 'false') {
                field.notNull = 'true';
                field.readOnly = 'false';
            }
        }
        if (column.auto === 'true') {
            field.readOnly = 'true';
        }
        return field;
    }

    getFields() {
        let fields = {};
        for (let i = 0; i < this.tableColumns.length; i++) {
            const column = this.tableColumns[i];
            fields[column.name] = this.getField(column);
        }
        return fields;
    }

    getFormParams() {
        return {
            name       : this.params.formName,
            caption    : this.params.formCaption,
            class      : this.params.className,
            dataSources: this.getDataSources(),
            fields     : this.getFields()
        };
    }
}
