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
        const fullName = this.getFullName();
        try {
            const column = this.getAttr('column');
            if (!column) throw new Error('no column attr');
            const value = row[column];
            // console.log('value:', value);
            params[fullName] = value !== undefined ? Helper.decodeValue(value) : null;
        } catch (err) {
            // console.log('row:', row);
            err.message = `${fullName}: ${err.message}`;
            throw err;
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
