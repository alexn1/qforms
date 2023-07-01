"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RowFormComboBoxFieldController = void 0;
const RowFormFieldController_1 = require("../RowFormFieldController");
const RowFormComboBoxFieldView_1 = require("./RowFormComboBoxFieldView");
const Helper_1 = require("../../../../../../common/Helper");
class RowFormComboBoxFieldController extends RowFormFieldController_1.RowFormFieldController {
    constructor() {
        super(...arguments);
        this.onEditButtonClick = async (e) => {
            console.log('RowFormComboBoxFieldController.onEditButtonClick');
            const itemEditPage = this.getModel().getAttr('itemEditPage');
            const value = this.getValue();
            // console.log('itemEditPage', itemEditPage);
            // console.log('value:', value);
            if (itemEditPage && value) {
                await this.openPage({
                    name: itemEditPage,
                    params: {
                        key: value,
                    },
                });
            }
        };
        this.onCreateButtonClick = async (e) => {
            console.log('RowFormComboBoxFieldController.onCreateButtonClick');
            const newRowMode = this.getModel().getAttr('newRowMode');
            const itemCreateForm = this.getModel().getAttr('itemCreateForm');
            if (!itemCreateForm)
                throw new Error('no itemCreateForm');
            let createPageName;
            if (newRowMode === 'editPage') {
                createPageName = this.getModel().getAttr('itemEditPage');
            }
            else if (newRowMode === 'createPage') {
                createPageName = this.getModel().getAttr('itemCreatePage');
            }
            else {
                throw new Error(`wrong newRowMode value: ${newRowMode}`);
            }
            // page
            const pc = await this.openPage({
                name: createPageName,
                newMode: true,
            });
            // form
            const form = pc.getModel().getForm(itemCreateForm);
            const onInsert = async (e) => {
                form.off('insert', onInsert);
                const [key] = e.inserts;
                const [id] = Helper_1.Helper.decodeValue(key);
                // console.log('id:', id);
                await this.onChange(id.toString());
            };
            form.on('insert', onInsert);
        };
        this.onListInsert = async (e) => {
            console.log('RowFormComboBoxFieldController.onListInsert');
            await this.rerender();
        };
        this.onListUpdate = async (e) => {
            // console.log('RowFormComboBoxFieldController.onListUpdate');
            await this.rerender();
        };
        this.onListDelete = async (e) => {
            await this.rerender();
        };
        this.onItemSelect = async (e) => {
            // console.log('RowFormComboBoxFieldController.onItemSelect');
            if (e.button === 0) {
                e.preventDefault();
                const id = this.getValue();
                const selectedKey = id ? JSON.stringify([id]) : undefined;
                await this.openPage({
                    name: this.getModel().getAttr('itemSelectPage'),
                    selectMode: true,
                    selectedKey: selectedKey,
                    onSelect: async (key) => {
                        if (key) {
                            const [id] = Helper_1.Helper.decodeValue(key);
                            // console.log('id:', id);
                            if (this.getValue() !== id) {
                                await this.getView().onChange(id.toString());
                            }
                        }
                        else {
                            if (this.getValue() !== null) {
                                await this.getView().onChange('');
                            }
                        }
                    },
                });
            }
        };
    }
    init() {
        // console.log('RowFormComboBoxFieldController.init', this.getModel().getFullName());
        super.init();
        const dataSource = this.getModel().getComboBoxDataSource();
        dataSource.on('insert', this.onListInsert);
        dataSource.on('update', this.onListUpdate);
        dataSource.on('delete', this.onListDelete);
    }
    deinit() {
        const dataSource = this.getModel().getComboBoxDataSource();
        dataSource.off('insert', this.onListInsert);
        dataSource.off('update', this.onListUpdate);
        dataSource.off('delete', this.onListDelete);
        super.deinit();
    }
    getViewClass() {
        return super.getViewClass() || RowFormComboBoxFieldView_1.RowFormComboBoxFieldView;
    }
    getItems() {
        try {
            return this.getRows().map((row) => ({
                value: this.valueToString(this.getModel().getValueValue(row)),
                title: this.getModel().getDisplayValue(row),
            }));
        }
        catch (err) {
            err.message = `${this.getModel().getFullName()}: ${err.message}`;
            throw err;
        }
    }
    getRows() {
        return this.getModel().getComboBoxDataSource().getRows();
    }
    getPlaceholder() {
        if (this.getModel().getAttr('placeholder'))
            return this.getModel().getAttr('placeholder');
        return this.getApp().getHostApp().isDebugMode() ? '[null]' : null;
    }
}
exports.RowFormComboBoxFieldController = RowFormComboBoxFieldController;
Helper_1.Helper.registerGlobalClass(RowFormComboBoxFieldController);
