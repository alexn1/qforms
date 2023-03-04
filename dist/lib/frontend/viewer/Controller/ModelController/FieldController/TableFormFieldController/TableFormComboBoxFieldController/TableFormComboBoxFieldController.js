"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableFormComboBoxFieldController = void 0;
const TableFormFieldController_1 = require("../TableFormFieldController");
const TableFormComboBoxFieldView_1 = require("./TableFormComboBoxFieldView");
class TableFormComboBoxFieldController extends TableFormFieldController_1.TableFormFieldController {
    constructor() {
        super(...arguments);
        this.onListUpdate = async (e) => {
            // console.log('TableFormComboBoxFieldController.onListUpdate', this.getModel().getFullName());
            this.getForm().invalidate();
            await this.getForm().rerender();
        };
    }
    init() {
        super.init();
        const dataSource = this.getModel().getComboBoxDataSource();
        dataSource.on('insert', this.onListUpdate);
        dataSource.on('update', this.onListUpdate);
        dataSource.on('delete', this.onListUpdate);
    }
    deinit() {
        const dataSource = this.getModel().getComboBoxDataSource();
        dataSource.off('insert', this.onListUpdate);
        dataSource.off('update', this.onListUpdate);
        dataSource.off('delete', this.onListUpdate);
        super.deinit();
    }
    getViewClass() {
        return super.getViewClass() || TableFormComboBoxFieldView_1.TableFormComboBoxFieldView;
    }
    getValueForWidget(row) {
        const value = this.model.getValue(row);
        const rawValue = this.model.valueToRaw(value);
        if (rawValue === undefined || rawValue === 'null')
            return '';
        const cbRow = this.model.findRowByRawValue(rawValue);
        if (cbRow) {
            return this.valueToString(this.model.getDisplayValue(cbRow));
        }
        return `[no row for id: ${rawValue}]`;
    }
}
exports.TableFormComboBoxFieldController = TableFormComboBoxFieldController;
// @ts-ignore
window.TableFormComboBoxFieldController = TableFormComboBoxFieldController;
