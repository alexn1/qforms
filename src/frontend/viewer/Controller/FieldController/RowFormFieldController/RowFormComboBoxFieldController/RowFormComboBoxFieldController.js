class RowFormComboBoxFieldController extends RowFormFieldController {
    init() {
        // console.log('RowFormComboBoxFieldController.init', this.getModel().getFullName());
        super.init();
        const ds = this.model.getComboBoxDataSource();
        ds.on('insert', this.onListInsert);
        ds.on('update', this.onListUpdate);
        ds.on('delete', this.onListDelete);
    }
    deinit() {
        const ds = this.model.getComboBoxDataSource();
        ds.off('insert', this.onListInsert);
        ds.off('update', this.onListUpdate);
        ds.off('delete', this.onListDelete);
        super.deinit();
    }

    getItems() {
        return this.getRows().map(row => ({
            value: this.model.getValueValue(row).toString(),
            title: this.model.getDisplayValue(row).toString()
        }));
    }
    getRows() {
        return this.model.getComboBoxDataSource().getRows();
    }
    getViewClass() {
        return RowFormComboBoxFieldView;
    }
    getPlaceholder() {
        if (this.model.getAttr('placeholder')) return this.model.getAttr('placeholder');
        return ApplicationController.isInDebugMode() ? '[null]' : null;
    }
    onEditButtonClick = async e => {
        console.log('RowFormComboBoxFieldController.onEditButtonClick');
        const itemEditPage = this.getModel().getAttr('itemEditPage');
        const value = this.getValue();
        // console.log('itemEditPage', itemEditPage);
        // console.log('value:', value);
        if (itemEditPage && value) {
            await this.openPage({
                name: itemEditPage,
                params: {
                    key: value
                }
            });
        }
    }
    onCreateButtonClick = async e => {
        console.log('RowFormComboBoxFieldController.onCreateButtonClick');
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
            newMode: true
        });

        // form
        const form = pc.getModel().getForm(itemCreateForm);
        const onInsert = e => {
            form.off('insert', onInsert);
            const [key] = e.inserts;
            const [id] = Helper.decodeValue(key);
            console.log('id:', id);
            this.setValue(id);
        }
        form.on('insert', onInsert);
    }
    onListInsert = async e => {
        console.log('RowFormComboBoxFieldController.onListInsert');
        await this.rerender();
    }
    onListUpdate = async e => {
        // console.log('RowFormComboBoxFieldController.onListUpdate');
        await this.rerender();
    }
    onListDelete = async e => {
        await this.rerender();
    }
    onItemSelect = async e => {
        // console.log('RowFormComboBoxFieldController.onItemSelect');
        if (e.button === 0) {
            e.preventDefault();
            const id = this.getValue();
            const selectedKey = id ? JSON.stringify([id]) : null;
            await this.openPage({
                name       : this.getModel().getAttr('itemSelectPage'),
                selectMode : true,
                selectedKey: selectedKey,
                onSelect   : async key => {
                    if (key) {
                        const [id] = Helper.decodeValue(key);
                        // console.log('id:', id);
                        if (this.getValue() !== id) {
                            await this.getView().onChange(id.toString());
                        }
                    } else {
                        if (this.getValue() !== null) {
                            await this.getView().onChange('');
                        }
                    }
                }
            });
        }
    }
}

window.QForms.RowFormComboBoxFieldController = RowFormComboBoxFieldController;
