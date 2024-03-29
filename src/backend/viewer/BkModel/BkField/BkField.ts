import path from 'path';

import { BkModel } from '../BkModel';
import { BkApplication } from '../BkApplication/BkApplication';
import { BkPage } from '../BkPage/BkPage';
import { BkForm } from '../BkForm/BkForm';
import { BkColumn } from '../BkColumn/BkColumn';
import { BkPersistentDataSource } from '../BkDataSource/BkPersistentDataSource/BkPersistentDataSource';
import { JSONString, RawRow } from '../../../../types';
import { Context } from '../../../Context';
import { FieldScheme } from '../../../common/Scheme/FieldScheme/FieldScheme';
import { FieldData } from '../../../../common/ModelData/FieldData';
import { Helper } from '../../../../frontend';

export class BkField<TFieldScheme extends FieldScheme = FieldScheme> extends BkModel<TFieldScheme> {
    fillAttributes(response: FieldData): void {
        response.class = this.getClassName();
        response.name = this.getAttr('name');
        response.caption = this.getAttr('caption');
        response.column = this.getAttr('column');
        response.defaultValue = this.getAttr('defaultValue');
        response.value = this.getAttr('value');
        response.param = this.getAttr('param');
        response.visible = this.getAttr('visible');
        response.type = this.getAttr('type');
        response.width = this.getAttr('width');
        response.cssBlock = this.getAttr('cssBlock');
        response.viewClass = this.getAttr('viewClass');
        response.ctrlClass = this.getAttr('ctrlClass');
        response.autoFocus = this.getAttr('autoFocus');
    }

    getDirPath(): string {
        return path.join(this.getParent<BkForm>().getDirPath(), 'fields', this.getName());
    }

    fillDefaultValue(context: Context, row: RawRow) {
        const column = this.getAttr('column');
        if (!column) return;
        const defaultValue = this.getForm().replaceThis(context, this.getAttr('defaultValue'));
        const params = context.getAllParams();
        const js = Helper.templateToJsString(defaultValue, params);
        let value;
        try {
            value = eval(js);
            if (value !== undefined) {
                row[column] = this.valueToRaw(value);
            }
        } catch (e) {
            throw new Error(`[${this.getFullName()}] fillDefaultValue eval error: ${e.toString()}`);
        }
    }

    dumpRowValueToParams(row: RawRow, context: Context) {
        // debug('Field.dumpRowValueToParams', this.getFullName());
        const fullName = this.getFullName();
        try {
            const column = this.getAttr('column');
            if (!column) throw new Error('no column attr');
            const rawValue = row[column];
            // debug('rawValue:', rawValue);
            const value = rawValue !== undefined ? this.rawToValue(rawValue) : null;
            // debug('value:', value);
            context.setParam(fullName, value);
        } catch (err) {
            // debug('row:', row);
            err.message = `${fullName}: ${err.message}`;
            throw err;
        }
    }

    getFullName(): string {
        return [this.getForm().getPage().getName(), this.getForm().getName(), this.getName()].join(
            '.',
        );
    }

    getApp(): BkApplication {
        return this.getParent().getParent().getParent();
    }

    getPage(): BkPage {
        return this.getParent().getParent();
    }

    getForm(): BkForm {
        return this.getParent();
    }

    isParam(): boolean {
        return this.isAttr('param') && this.getAttr('param') === 'true';
    }

    valueToRaw(value: any): JSONString {
        return Helper.encodeValue(value);
    }

    rawToValue(raw: JSONString): any {
        return Helper.decodeValue(raw);
    }

    isTimezone(): boolean {
        return this.getAttr('timezone') === 'true';
    }

    getDatabaseTableColumn(): BkColumn {
        if (!this.getAttr('column')) throw new Error(`${this.getFullName()}: column attr is empty`);
        const defaultDataSource = this.getForm().getDataSource('default') as BkPersistentDataSource;
        // if (!defaultDataSource) throw new Error(`${this.getFullName()}: no default datasource`);
        return defaultDataSource.getTable().getColumn(this.getAttr('column'));
    }

    getType(): string {
        if (this.getAttr('column')) {
            return this.getDatabaseTableColumn().getAttr('type');
        }
        if (this.getAttr('type')) {
            return this.getAttr('type');
        }
        throw new Error(`${this.getFullName()}: type attr is empty`);
    }

    getDbType() {
        return this.getDatabaseTableColumn().getAttr('dbType');
    }

    valueToDbValue(value: any) {
        if (this.getDbType() === 'json') {
            return JSON.stringify(value);
        }
        return value;
    }
}
