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

    getDirPath() {
        return path.join(this.parent.getDirPath(), 'fields', this.getName());
    }

    fillDefaultValue(context, row) {
        const column = this.getAttr('column');
        if (!column) return;
        const defaultValue = this.getForm().replaceThis(context, this.getAttr('defaultValue'));
        const params = qforms.Application.getParams(context);
        const js = Helper.templateToJsString(defaultValue, params);
        let value;
        try {
            value = eval(js);
            if (value !== undefined) {
                row[column] = Helper.encodeValue(value);
            }
        } catch (e) {
            throw new Error(`[${this.getFullName()}] fillDefaultValue: ${e.toString()}`);
        }

    }

    dumpRowValueToParams(row, params) {
        // console.log('Field.dumpRowValueToParams', this.getFullName());
        const name  = this.getFullName();
        const column = this.getAttr('column');
        // if (this.getForm().getDefaultDataSource() && this.getForm().getDefaultDataSource().getDbType(column) === 'text') return;
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
