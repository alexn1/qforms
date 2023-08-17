import { RowFormFieldController } from '../RowFormFieldController';
import { RowFormComboBoxFieldView } from './RowFormComboBoxFieldView';
import { Helper } from '../../../../../../common/Helper';
import { ComboBoxField } from '../../../../../Model/Field/ComboBoxField/ComboBoxField';
import { Key, keyToKeyTuple, keyTupleToKey } from '../../../../../../../types';

export class RowFormComboBoxFieldController extends RowFormFieldController<ComboBoxField> {
    init() {
        // console.debug('RowFormComboBoxFieldController.init', this.getModel().getFullName());
        super.init();
        const dataSource = this.getModel().getComboBoxDataSource();
        dataSource!.on('insert', this.onListInsert);
        dataSource!.on('update', this.onListUpdate);
        dataSource!.on('delete', this.onListDelete);
    }

    deinit() {
        const dataSource = this.getModel().getComboBoxDataSource();
        dataSource!.off('insert', this.onListInsert);
        dataSource!.off('update', this.onListUpdate);
        dataSource!.off('delete', this.onListDelete);
        super.deinit();
    }

    getViewClass() {
        return super.getViewClass() || RowFormComboBoxFieldView;
    }

    getItems() {
        try {
            return this.getRows().map((row) => ({
                value: this.valueToString(this.getModel().getValueValue(row)),
                title: this.getModel().getDisplayValue(row),
            }));
        } catch (err) {
            err.message = `${this.getModel().getFullName()}: ${err.message}`;
            throw err;
        }
    }

    getRows() {
        return this.getModel().getComboBoxDataSource()!.getRows();
    }

    getPlaceholder() {
        if (this.getModel().getAttr('placeholder')) return this.getModel().getAttr('placeholder');
        return this.getApp().getHostApp().isDebugMode() ? '[null]' : null;
    }

    onEditButtonClick = async (e) => {
        console.debug('RowFormComboBoxFieldController.onEditButtonClick');
        const itemEditPage = this.getModel().getAttr('itemEditPage');
        const value = this.getValue();
        // console.debug('itemEditPage', itemEditPage);
        // console.debug('value:', value);
        if (itemEditPage && value) {
            await this.openPage({
                name: itemEditPage,
                params: {
                    key: value,
                },
            });
        }
    };

    onCreateButtonClick = async (e) => {
        console.debug('RowFormComboBoxFieldController.onCreateButtonClick');
        const newRowMode = this.getModel().getAttr('newRowMode');
        const itemCreateForm = this.getModel().getAttr('itemCreateForm');
        if (!itemCreateForm) throw new Error('no itemCreateForm');

        let createPageName;
        if (newRowMode === 'editPage') {
            createPageName = this.getModel().getAttr('itemEditPage');
        } else if (newRowMode === 'createPage') {
            createPageName = this.getModel().getAttr('itemCreatePage');
        } else {
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
            const [id] = Helper.decodeValue(key);
            // console.debug('id:', id);
            await this.onChange(id.toString());
        };
        form.on('insert', onInsert);
    };

    onListInsert = async (e) => {
        console.debug('RowFormComboBoxFieldController.onListInsert');
        await this.rerender();
    };

    onListUpdate = async (e) => {
        // console.debug('RowFormComboBoxFieldController.onListUpdate');
        await this.rerender();
    };

    onListDelete = async (e) => {
        await this.rerender();
    };

    onItemSelect = async (e) => {
        // console.debug('RowFormComboBoxFieldController.onItemSelect');
        if (e.button === 0) {
            e.preventDefault();
            const id = this.getValue();
            const selectedKey = id ? keyTupleToKey([id]) : undefined;
            await this.openPage({
                name: this.getModel().getAttr('itemSelectPage'),
                selectMode: true,
                selectedKey: selectedKey,
                onSelect: async (key: Key) => {
                    if (key) {
                        const [id] = keyToKeyTuple(key);
                        // console.debug('id:', id);
                        if (this.getValue() !== id) {
                            await (this.getView() as RowFormComboBoxFieldView).onChange(
                                id.toString(),
                            );
                        }
                    } else {
                        if (this.getValue() !== null) {
                            await (this.getView() as RowFormComboBoxFieldView).onChange('');
                        }
                    }
                },
            });
        }
    };
}

Helper.registerGlobalClass(RowFormComboBoxFieldController);
