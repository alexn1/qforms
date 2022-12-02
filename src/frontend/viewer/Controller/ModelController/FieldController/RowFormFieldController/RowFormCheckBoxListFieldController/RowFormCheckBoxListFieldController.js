import {RowFormFieldController} from '../RowFormFieldController';

export class RowFormCheckBoxListFieldController extends RowFormFieldController {
    init() {
        // console.log('RowFormCheckBoxListFieldController.init', this.getModel().getFullName());
        super.init();
        const dataSource = this.model.getDataSource();
        dataSource.on('insert', this.onListInsert);
        dataSource.on('update', this.onListUpdate);
        dataSource.on('delete', this.onListDelete);
    }
    deinit() {
        const dataSource = this.model.getDataSource();
        dataSource.off('insert', this.onListInsert);
        dataSource.off('update', this.onListUpdate);
        dataSource.off('delete', this.onListDelete);
        super.deinit();
    }
    getViewClass() {
        return super.getViewClass() || RowFormCheckBoxListFieldView;
    }
    getRows() {
        return this.model.getDataSource().getRows();
    }
    onListInsert = async e => {
        console.log('RowFormCheckBoxListFieldController.onListInsert');
        await this.rerender();
    }
    onListUpdate = async e => {
        // console.log('RowFormCheckBoxListFieldController.onListUpdate');
        await this.rerender();
    }
    onListDelete = async e => {
        await this.rerender();
    }
    getValueForWidget() {
        // console.log('RowFormCheckBoxListFieldController.getValueForWidget');
        const value = this.getValue();
        // console.log('value:', value);
        return value;
    }
    setValueFromWidget(widgetValue) {
        this.setValue(widgetValue);
    }
    getItemFromRow(row) {
        return {
            value: this.valueToString(this.getModel().getValueValue(row)),
            title: this.getModel().getDisplayValue(row)
        };
    }
}

window.QForms.RowFormCheckBoxListFieldController = RowFormCheckBoxListFieldController;
