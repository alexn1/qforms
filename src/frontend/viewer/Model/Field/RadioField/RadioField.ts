import { Field } from '../Field';
import { Helper } from '../../../../common';
import { JSONString, RawRow } from '../../../../../types';
import { DataSource } from '../../DataSource/DataSource';

export class RadioField extends Field {
    getDisplayValue(row: RawRow) {
        const displayColumn = this.getAttr('displayColumn');
        let value: any = null;
        if (row[displayColumn]) {
            try {
                value = Helper.decodeValue(row[displayColumn]);
            } catch (err) {
                console.debug('cannot parse:', row[displayColumn]);
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

    getValueValue(row: RawRow) {
        const valueColumn = this.getAttr('valueColumn');
        if (!row[valueColumn]) {
            throw new Error('no valueColumn in ComboBox data source');
        }
        return Helper.decodeValue(row[valueColumn]);
    }

    getDataSource(): DataSource {
        const name = this.getAttr('dataSourceName');
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
        const valueColumn = this.getAttr('valueColumn');
        return this.getDataSource()!
            .getRows()
            .find((row) => row[valueColumn] === rawValue);
    }
}

Helper.registerGlobalClass(RadioField);
