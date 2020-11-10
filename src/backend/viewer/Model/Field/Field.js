const path    = require('path');
const qforms = require('../../../qforms');
const Helper = require('../../../Helper');
const Model  = require('../Model');

class Field extends Model {
    static async create(data, parent) {
        return new Field(data, parent);
    }

    // constructor(data, parent) {
    //     super(data, parent);
    // }

    getCustomViewFilePath() {
        return path.join(this.getDirPath(), `${this.getName()}.ejs`);
    }

    getDirPath() {
        return path.join(this.parent.getDirPath(), 'fields', this.getName());
    }

    fillDefaultValue(context, row) {
        const column = this.getAttr('column');
        const defaultValue = this.getForm().replaceThis(context, this.getAttr('defaultValue'));
        const params = qforms.Application.getParams(context);
        const code = qforms.Helper.templateValue(defaultValue, params);
        let value;
        try {
            value = eval(code);
        } catch (e) {
            throw new Error('[' + this.getFullName() + '] default value error: ' + e.toString());
        }
        if (value === undefined) {
            value = null;
        }
        row[column] = JSON.stringify(value);
    }

    dumpRowValueToParams(row, params) {
        // console.log('Field.dumpRowValueToParams', this.getFullName());
        const name  = this.getFullName();
        const column = this.getAttr('column');
        // if (this.getForm().getDataSource() && this.getForm().getDataSource().getDbType(column) === 'text') return;
        if (this.isParam()) {
            params[name] = Helper.decodeValue(row[column]);
        }
    }

    getFullName() {
        return [
            this.getForm().getPage().getName(),
            this.getForm().getName(),
            this.getName()
        ].join('.');
    }

    calcValue(row) {
        row[this.getAttr('column')] = eval(this.getAttr('value'));
    }

    getApp() {
        return this.parent.parent.parent;
    }

    getPage() {
        return this.parent.parent;
    }

    getForm() {
        return this.parent;
    }
    isParam() {
        return this.isAttr('param') && this.getAttr('param') === 'true';
    }

}

module.exports = Field;
