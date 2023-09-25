import { RowFormFieldController } from '../RowFormFieldController';
import { RowFormCheckBoxListFieldView } from './RowFormCheckBoxListFieldView';
import { CheckBoxListField } from '../../../../../Model/Field/CheckBoxListField/CheckBoxListField';
import { Helper } from '../../../../../../common/Helper';

export class RowFormCheckBoxListFieldController extends RowFormFieldController<CheckBoxListField> {
    init() {
        // console.debug('RowFormCheckBoxListFieldController.init', this.getModel().getFullName());
        super.init();
        const dataSource = this.getModel().getDataSource();
        dataSource!.on('insert', this.onListInsert);
        dataSource!.on('update', this.onListUpdate);
        dataSource!.on('delete', this.onListDelete);
    }

    deinit() {
        const dataSource = this.getModel().getDataSource();
        dataSource!.off('insert', this.onListInsert);
        dataSource!.off('update', this.onListUpdate);
        dataSource!.off('delete', this.onListDelete);
        super.deinit();
    }

    getViewClass() {
        return super.getViewClass() || RowFormCheckBoxListFieldView;
    }

    getRows() {
        return this.getModel().getDataSource()!.getRows();
    }

    onListInsert = async (e) => {
        console.debug('RowFormCheckBoxListFieldController.onListInsert');
        await this.rerender();
    };

    onListUpdate = async (e) => {
        // console.debug('RowFormCheckBoxListFieldController.onListUpdate');
        await this.rerender();
    };

    onListDelete = async (e) => {
        await this.rerender();
    };

    getValueForWidget() {
        // console.debug('RowFormCheckBoxListFieldController.getValueForWidget');
        const value = this.getValue();
        // console.debug('value:', value);
        return value;
    }

    setValueFromWidget(widgetValue) {
        this.setValue(widgetValue);
    }

    getItemFromRow(row) {
        return {
            value: this.valueToString(this.getModel().getValueValue(row)),
            title: this.getModel().getDisplayValue(row),
        };
    }
}

Helper.registerGlobalClass(RowFormCheckBoxListFieldController);
