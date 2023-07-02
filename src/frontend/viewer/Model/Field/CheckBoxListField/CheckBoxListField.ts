import { Field } from '../Field';
import { Helper } from '../../../../common';
import { JSONString, RawRow } from '../../../../../types';
import { DataSource } from '../../DataSource/DataSource';

export class CheckBoxListField extends Field {
    getDisplayValue(row: RawRow) {
        let value: any = null;
        if (row[this.getData().displayColumn]) {
            try {
                value = Helper.decodeValue(row[this.getData().displayColumn]);
            } catch (err) {
                console.log('cannot parse:', row[this.getData().displayColumn]);
                throw err;
            }
        } else {
            value = this.getData().displayColumn;
            value = value.replace(/\{([\w\.]+)\}/g, (text, name) => {
                return row.hasOwnProperty(name) ? row[name] || '' : text;
            });
        }
        return value;
    }

    getValueValue(row: RawRow) {
        if (!row[this.getData().valueColumn]) {
            throw new Error('no valueColumn in CheckBoxList data source');
        }
        return Helper.decodeValue(row[this.getData().valueColumn]);
    }

    getDataSource(): DataSource {
        const name = this.getData().dataSourceName;
        if (!name) throw new Error(`${this.getFullName()}: no dataSourceName`);
        if (this.getForm().findDataSource(name)) {
            return this.getForm().getDataSource(name);
        }
        if (this.getPage().findDataSource(name)) {
            return this.getPage().getDataSource(name);
        }
        if (this.getApp().findDataSource(name)) {
            return this.getApp().getDataSource(name);
        }
        throw new Error(`${this.getFullName()}: no data source: ${name}`);
    }

    findRowByRawValue(rawValue: JSONString): RawRow | undefined {
        return this.getDataSource()!
            .getRows()
            .find((row) => row[this.getData().valueColumn] === rawValue);
    }
}

Helper.registerGlobalClass(CheckBoxListField);
