import { Field } from '../Field';
import { Helper } from '../../../../common';
import { JSONString, RawRow } from '../../../../../types';

export class RadioField extends Field {
    getDisplayValue(row) {
        const displayColumn = this.getAttr('displayColumn');
        let value = null;
        if (row[displayColumn]) {
            try {
                value = Helper.decodeValue(row[displayColumn]);
            } catch (err) {
                console.log('cannot parse:', row[displayColumn]);
                throw err;
            }
        } else {
            value = displayColumn;
            value = value.replace(/\{([\w\.]+)\}/g, (text, name) => {
                return row.hasOwnProperty(name) ? row[name] || '' : text;
            });
        }
        return value;
    }

    getValueValue(row) {
        const valueColumn = this.getAttr('valueColumn');
        if (!row[valueColumn]) {
            throw new Error('no valueColumn in ComboBox data source');
        }
        return Helper.decodeValue(row[valueColumn]);
    }

    getDataSource() {
        const name = this.getAttr('dataSourceName');
        if (!name) throw new Error(`${this.getFullName()}: no dataSourceName`);
        if (this.getForm().getDataSource(name)) {
            return this.getForm().getDataSource(name);
        }
        if (this.getPage().getDataSource(name)) {
            return this.getPage().getDataSource(name);
        }
        if (this.getApp().getDataSource(name)) {
            return this.getApp().getDataSource(name);
        }
        throw new Error(`${this.getFullName()}: no data source: ${name}`);
    }

    findRowByRawValue(rawValue: JSONString): RawRow {
        const valueColumn = this.getAttr('valueColumn');
        return this.getDataSource()
            .getRows()
            .find((row) => row[valueColumn] === rawValue);
    }
}

/* declare global {
    interface Window {
        RadioField: RadioField;
    }
} */

// @ts-ignore
window.RadioField = RadioField;
