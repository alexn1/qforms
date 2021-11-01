class FormWizard {
    static create(params) {
        console.log('FormWizard.create', params);
        switch (params.model.database.getClassName()) {
            case 'MySqlDatabase'     : return new MySqlFormWizard(params);
            case 'PostgreSqlDatabase': return new PostgreSqlFormWizard(params);
            default: throw new Error(`unknown database class: ${params.model.database.getClassName()}`);
        }
    }

    constructor(params) {
        console.log('FormWizard.constructor', params);
        this.params        = params;
        this.model         = params.model;
        this.databaseName  = params.model.database.getName();
        this.tableName     = params.model.getName();
        this.tableColumns  = Object.keys(params.model.data.columns).map(name => params.model.data.columns[name]['@attributes']);
    }

    getDataSources() {
        return [
            {
                class     : 'SqlDataSource',
                name      : 'default',
                database  : this.databaseName,
                table     : this.tableName,
                limit     : this.params.className === 'TableForm' ? '100' : '',
                countQuery   : this.getCountQuery(),
                singleQuery  : this.getSingleQuery(),
                multipleQuery: this.getMultipleQuery()
            }
        ];
    }

    getFieldClass(column) {
        if (column.type === 'date') return 'DateField';
        if (column.type === 'boolean') return 'CheckBoxField';
        if (this.params.className === 'RowForm') {
            if (column.dbType === 'text') {
                return 'TextAreaField';
            }
            if (column.dbType === 'json') {
                return 'TextAreaField';
            }
        }
        return 'TextBoxField';
    }

    getField(column) {
        // console.log('FormWizard.getField', column);
        let field = {
            class: this.getFieldClass(column),
            name : column.name,
            caption: column.caption || column.name
        };
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
        if (column.type === 'date' && column.dbType === 'timestamp without time zone') {
            field.timezone = 'false';
        }
        return field;
    }

    getFields() {
        /*let fields = {};
        this.getColumns().forEach(column => {
            fields[column.name] = this.getField(column);
        });
        return fields;*/
        return this.getColumns().map(column => this.getField(column));
    }

    getColumns() {
        return this.tableColumns.filter(column => {
            if (this.params.className === 'TableForm') {
                if (column.dbType === 'text') return false;
                if (column.dbType === 'bytea') return false;
            }
            return true;
        });
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
