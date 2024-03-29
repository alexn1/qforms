import { Key, RawRow } from '../../../../../types';
import { Form } from '../Form';
import { Helper } from '../../../../common/Helper';

export class RowForm extends Form {
    init() {
        super.init();
        if (this.isNewMode()) {
            this.getDefaultDataSource().newRow(this.createRow());
        }
        this.fillParams(this.getRow()); // dump row values to page params
    }

    isNewMode() {
        const newMode = this.getAttr('newMode');
        if (newMode === 'true') return true;
        if (newMode === 'false') return false;
        return this.getPage().isNewMode();
    }

    fillParams(row: RawRow) {
        for (const field of this.fields) {
            field.valueToPageParams(row);
        }
    }

    onDataSourceUpdate(e) {
        this.fillParams(this.getRow());
        super.onDataSourceUpdate(e);
    }

    onDataSourceInsert(e) {
        this.fillParams(this.getRow());
        super.onDataSourceInsert(e);
    }

    getRow(withChanges = false): RawRow {
        return this.getDefaultDataSource().getSingleRow(withChanges);
    }

    getKey(): Key | null {
        // console.debug('RowForm.getKey', this.getFullName());
        const dataSource = this.getDefaultDataSource();
        if (dataSource.isPersistent()) {
            const row = this.getRow();
            return dataSource.getRowKey(row);
        }
        return null;
    }

    createRow(): RawRow {
        const row = {} as RawRow;
        this.fillDefaultValues(row);
        return row;
    }

    discard(fields: string[] = []) {
        console.debug('RowForm.discard', fields);
        if (this.getDefaultDataSource().isChanged()) {
            this.getDefaultDataSource().discard();
            fields.forEach((name) => {
                this.getField(name)!.valueToPageParams(this.getRow());
            });
        }
    }
}

Helper.registerGlobalClass(RowForm);
