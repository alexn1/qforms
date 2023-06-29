import { Field } from '../Field';
import { Helper } from '../../../../common';
import { JSONString, RawRow } from '../../../../../types';

export class CheckBoxListField extends Field {
    getDisplayValue(row: RawRow) {
        let value: any = null;
        if (row[this.data.displayColumn]) {
            try {
                value = Helper.decodeValue(row[this.data.displayColumn]);
            } catch (err) {
                console.log('cannot parse:', row[this.data.displayColumn]);
                throw err;
            }
        } else {
            value = this.data.displayColumn;
            value = value.replace(/\{([\w\.]+)\}/g, (text, name) => {
                return row.hasOwnProperty(name) ? row[name] || '' : text;
            });
        }
        return value;
    }

    getValueValue(row) {
        if (!row[this.data.valueColumn]) {
            throw new Error('no valueColumn in CheckBoxList data source');
        }
        return Helper.decodeValue(row[this.data.valueColumn]);
    }

    getDataSource() {
        const name = this.data.dataSourceName;
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

    findRowByRawValue(rawValue: JSONString): RawRow | undefined {
        return this.getDataSource()!
            .getRows()
            .find((row) => row[this.data.valueColumn] === rawValue);
    }
}

Helper.registerGlobalClass(CheckBoxListField);
