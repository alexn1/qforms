const path = require('path');

import Model from '../Model';
import Application from '../Application/Application';
import Page from '../Page/Page';
import Form from '../Form/Form';

const Helper = require('../../../Helper');

class Field extends Model {
    static async create(data, parent): Promise<Field> {
        return new Field(data, parent);
    }

    // constructor(data, parent) {
    //     super(data, parent);
    // }

    getDirPath(): string {
        return path.join(this.parent.getDirPath(), 'fields', this.getName());
    }

    fillDefaultValue(context, row) {
        const column = this.getAttr('column');
        if (!column) return;
        const defaultValue = this.getForm().replaceThis(context, this.getAttr('defaultValue'));
        const params = Application.getParams(context);
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

    getFullName(): string {
        return [
            this.getForm().getPage().getName(),
            this.getForm().getName(),
            this.getName()
        ].join('.');
    }

    calcValue(row) {
        row[this.getAttr('column')] = eval(this.getAttr('value'));
    }

    getApp(): Application {
        return this.parent.parent.parent;
    }

    getPage(): Page {
        return this.parent.parent;
    }

    getForm(): Form {
        return this.parent;
    }
    isParam(): boolean {
        return this.isAttr('param') && this.getAttr('param') === 'true';
    }

}

export = Field;
