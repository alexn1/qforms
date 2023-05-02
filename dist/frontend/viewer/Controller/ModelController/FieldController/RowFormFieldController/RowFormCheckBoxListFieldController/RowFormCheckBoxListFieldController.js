"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RowFormCheckBoxListFieldController = void 0;
const RowFormFieldController_1 = require("../RowFormFieldController");
const RowFormCheckBoxListFieldView_1 = require("./RowFormCheckBoxListFieldView");
const Helper_1 = require("../../../../../../common/Helper");
class RowFormCheckBoxListFieldController extends RowFormFieldController_1.RowFormFieldController {
    constructor() {
        super(...arguments);
        this.onListInsert = async (e) => {
            console.log('RowFormCheckBoxListFieldController.onListInsert');
            await this.rerender();
        };
        this.onListUpdate = async (e) => {
            // console.log('RowFormCheckBoxListFieldController.onListUpdate');
            await this.rerender();
        };
        this.onListDelete = async (e) => {
            await this.rerender();
        };
    }
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
        return super.getViewClass() || RowFormCheckBoxListFieldView_1.RowFormCheckBoxListFieldView;
    }
    getRows() {
        return this.model.getDataSource().getRows();
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
            title: this.getModel().getDisplayValue(row),
        };
    }
}
exports.RowFormCheckBoxListFieldController = RowFormCheckBoxListFieldController;
Helper_1.Helper.registerGlobalClass(RowFormCheckBoxListFieldController);
