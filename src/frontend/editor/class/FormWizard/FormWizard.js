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
            case 'MySqlDatabase': return new MySqlFormWizard(params);
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

    getField(column) {
        console.log('FormWizard.getField', column);
        let field = {
            class: 'TextBoxField',
            name : column.name
        };
        if (column.caption) {
            field.caption = column.caption;
        }
        if (column.key === 'true') {
            field.readOnly = 'true';
        }
        if (column.nullable === 'false') {
            field.notNull = 'true';
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
