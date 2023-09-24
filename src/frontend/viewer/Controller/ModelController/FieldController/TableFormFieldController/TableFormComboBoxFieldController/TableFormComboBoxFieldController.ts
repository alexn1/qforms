import { TableFormFieldController } from '../TableFormFieldController';
import { TableFormComboBoxFieldView } from './TableFormComboBoxFieldView';
import { ComboBoxField } from '../../../../../Model/Field/ComboBoxField/ComboBoxField';
import { RawRow } from '../../../../../../../types';
import { Helper } from '../../../../../../../common/Helper';

export class TableFormComboBoxFieldController extends TableFormFieldController<ComboBoxField> {
    init() {
        super.init();
        const dataSource = this.getModel().getComboBoxDataSource();
        dataSource!.on('insert', this.onListUpdate);
        dataSource!.on('update', this.onListUpdate);
        dataSource!.on('delete', this.onListUpdate);
    }

    deinit() {
        const dataSource = this.getModel().getComboBoxDataSource();
        dataSource!.off('insert', this.onListUpdate);
        dataSource!.off('update', this.onListUpdate);
        dataSource!.off('delete', this.onListUpdate);
        super.deinit();
    }

    getViewClass() {
        return super.getViewClass() || TableFormComboBoxFieldView;
    }

    getValueForWidget(row: RawRow): string {
        const value = this.getModel().getValue(row);
        const rawValue = this.getModel().valueToRaw(value);
        if (rawValue === undefined || rawValue === 'null') return '';
        const cbRow = this.getModel().findRowByRawValue(rawValue);
        if (cbRow) {
            return this.valueToString(this.getModel().getDisplayValue(cbRow));
        }
        return `[no row for id: ${rawValue}]`;
    }

    onListUpdate = async (e) => {
        // console.debug('TableFormComboBoxFieldController.onListUpdate', this.getModel().getFullName());
        this.getForm().invalidate();
        await this.getForm().rerender();
    };
}

Helper.registerGlobalClass(TableFormComboBoxFieldController);
