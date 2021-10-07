class TableFormController extends FormController {
    constructor(model, parent) {
        super(model, parent);
        this.state = {
            updated: Date.now()
        };
        this.grid = null;
    }
    getViewClass() {
        return TableFormView;
    }
    init() {
        super.init();
        // this.parent.on('hide', this.onHidePage);
        // this.parent.on('show', this.onShowPage);
        this.model.on('refresh', this.onModelRefresh);
        this.model.on('update' , this.onModelUpdate);
        this.model.on('delete' , this.onModelDelete);
        this.model.on('insert' , this.onModelInsert);
    }
    deinit() {
        // this.parent.off('hide', this.onHidePage);
        // this.parent.off('show', this.onShowPage);
        this.model.off('refresh', this.onModelRefresh);
        this.model.off('update' , this.onModelUpdate);
        this.model.off('delete' , this.onModelDelete);
        this.model.off('insert' , this.onModelInsert);
        super.deinit();
    }
    onGridCreate = grid => {
        this.grid = grid;
    }
    onNewClick = async e => {
        console.log('TableFormController.onNewClick');
        await this.new();
    }
    onRefreshClick = async e => {
        console.log('TableFormController.onRefreshClick', this.model.getFullName());
        await this.model.refresh();
        // console.error('refresh error handler:', err.message);
        // alert(err.message);
    }
    onDeleteClick = async e => {
        console.log('TableFormController.onDeleteClick', this.model.getFullName(), this.grid.getActiveRowKey());
        if (confirm(this.model.getApp().getText().form.areYouSure)) {
            await this.model.getDefaultDataSource().delete(this.grid.getActiveRowKey());
        }
    }
    onGridCellDblClick = async (row, key) => {
        // console.log('TableFormController.onGridCellDblClick', row);
        // const bodyCell = e.bodyCell;
        // const row = bodyCell.bodyRow.dbRow;
        // console.log('row:', row);
        // const key = this.model.getDefaultDataSource().getRowKey(row);
        // console.log('key:', key);
        switch (this.model.getAttr('editMethod')) {
            // case 'table':
            //     this.grid.gridColumns[bodyCell.qFieldName].beginEdit(bodyCell);
            // break;
            case 'form':
                if (this.getPage().getModel().options.selectMode) {
                    await this.getPage().selectRow(key);
                } else {
                    await this.edit(key);
                }
            break;
        }
    }
    onGridLinkClick = async key => {
        console.log('TableFormController.onGridLinkClick', key);
        await this.edit(key);
    }
    onGridDeleteClick = async (row, key) => {
        console.log('TableFormController.onGridDeleteClick', row, key);
        if (this.getModel().getAttr('deleteRowMode') !== 'disabled') {
            if (confirm(this.model.getApp().getText().form.areYouSure)) {
                await this.model.getDefaultDataSource().delete(key);
            }
        }
    }
    onHidePage = async () => {
        // this.grid.saveScroll();
    }
    onShowPage = async () => {
        console.log('TableFormController.onShowPage', this.model.getFullName());
        /*if (!this.grid.isHidden()) {
            this.grid.restoreScroll();
            this.grid.focus();
            // console.log('document.activeElement:', document.activeElement);
        }*/
    }
    async new() {
        if (this.model.getAttr('newRowMode') === 'oneclick') {
            const row = {};
            this.model.fillDefaultValues(row);
            await this.model.getDefaultDataSource().insert(row);
        } else if (this.model.getAttr('newRowMode') === 'editform') {
            if (!this.model.getAttr('itemEditPage')) {
                throw new Error(`[${this.model.getFullName()}] itemEditPage is empty`);
            }
            await this.openPage({
                name   : this.model.getAttr('itemEditPage'),
                newMode: true,
                modal  : true
            });
        } else if (this.model.getAttr('newRowMode') === 'createform') {
            if (!this.model.getAttr('itemCreatePage')) {
                throw new Error(`[${this.model.getFullName()}] itemCreatePage is empty`);
            }
            await this.openPage({
                name   : this.model.getAttr('itemCreatePage'),
                newMode: true,
                modal  : true
            });
        } else if (this.model.getAttr('newRowMode') === 'oneclick editform') {
            if (!this.model.getAttr('itemEditPage')) {
                throw new Error(`[${this.model.getFullName()}] itemEditPage is empty`);
            }
            const row = {};
            this.model.fillDefaultValues(row);
            const result = await this.model.getDefaultDataSource().insert(row);
            const database = this.model.getDefaultDataSource().getAttr('database');
            const table = this.model.getDefaultDataSource().getAttr('table');
            const [key] = result[database][table].insert;
            await this.openPage({
                name : this.model.getAttr('itemEditPage'),
                // key  : key,
                modal: true,
                params: {
                    ...DataSource.keyToParams(key)
                }
            });
        } else if (this.model.getAttr('newRowMode') === 'oneclick createform') {
            if (!this.model.getAttr('itemCreatePage')) {
                throw new Error(`[${this.model.getFullName()}] itemCreatePage is empty`);
            }
            const row = {};
            this.model.fillDefaultValues(row);
            const result = await this.model.getDefaultDataSource().insert(row);
            const database = this.model.getDefaultDataSource().getAttr('database');
            const table = this.model.getDefaultDataSource().getAttr('table');
            const [key] = result[database][table].insert;
            await this.openPage({
                name : this.model.getAttr('itemCreatePage'),
                // key  : key,
                modal: true,
                params: {
                    ...DataSource.keyToParams(key)
                }
            });
        }
    }
    async edit(key) {
        // console.log('TableForm.edit', this.model.getFullName(), key);
        if (!this.model.getAttr('itemEditPage')) {
            throw new Error(`${this.model.getFullName()}: itemEditPage is empty`);
        }
        try {
            await this.openPage({
                name : this.model.getAttr('itemEditPage'),
                // key  : key,
                modal: true,
                params: {
                    ...DataSource.keyToParams(key)
                }
            });
        } catch (err) {
            // console.error(`${this.model.getFullName()}: edit form error handler:`, err);
            // alert(`${this.model.getFullName()}: ${err.message}`);
            err.message = `${this.model.getFullName()} edit: ${err.message}`;
            throw err;
        }
    }
    onModelRefresh = async e => {
        console.log('TableFormController.onModelRefresh', this.model.getFullName(), e);
        if (!this.view) return;
        this.invalidate();
        await this.rerender();
    }
    onModelInsert = async e => {
        console.log('TableFormController.onModelInsert', this.model.getFullName(), e);
        if (!this.view) return;
        if (this.grid && e.source) {
            for (const key of e.inserts) {
                this.grid.setActiveRowKey(key);
            }
        }
        this.invalidate();
        await this.rerender();
    }
    onModelUpdate = async e => {
        console.log('TableFormController.onModelUpdate', this.model.getFullName(), e, this.view);
        if (!this.view) return;
        if (this.grid) {
            for (const key in e.updates) {
                if (this.grid.getActiveRowKey() === key) {
                    const newKey = e.updates[key];
                    if (key !== newKey) {
                        this.grid.setActiveRowKey(newKey);
                    }
                }
            }
        }
        this.invalidate();
        await this.rerender();
    }
    onModelDelete = async e => {
        console.log('TableFormController.onModelDelete', this.model.getFullName(), e);
        if (!this.view) return;
        if (this.grid) {
            for (const key of e.deletes) {
                if (this.grid.getActiveRowKey() === key) {
                    this.grid.setActiveRowKey(null);
                }
            }
        }
        this.invalidate();
        await this.rerender();
    }

    onGridSelectionChange = async key => {
        // console.log('TableFormController.onGridSelectionChange', key);
        this.invalidate();
        await this.getPage().rerender();
    }
    getActiveRow() {
        const key = this.grid.getActiveRowKey();
        if (!key) throw new Error(`${this.model.getFullName()}: no active row key`);
        return this.model.getDefaultDataSource().getRow(key);
    }
    isRowSelected = () => {
        // console.log('TableFormController.isRowSelected');
        return !!this.grid && !!this.grid.getActiveRowKey();
    }
    onFrameChanged = async value => {
        // console.log('TableFormController.onFrameChanged', parseInt(value));
        const frame = parseInt(value);
        this.model.getDefaultDataSource().setFrame(frame);
        this.model.getDefaultDataSource().refresh();
        await this.rerender();
    }
    onNextClick = async () => {
        console.log('TableFormController.onNextClick');
        const frame = this.model.getDefaultDataSource().getFrame() + 1;
        this.model.getDefaultDataSource().setFrame(frame);
        this.model.getDefaultDataSource().refresh();
        await this.rerender();
    }

    onPreviousClick = async () => {
        console.log('TableFormController.onPreviousClick');
        const frame = this.model.getDefaultDataSource().getFrame() - 1;
        this.model.getDefaultDataSource().setFrame(frame);
        this.model.getDefaultDataSource().refresh();
        this.rerender();
    }
    canPrev() {
        return this.model.getDefaultDataSource().getFrame() > 1;
    }
    canNext() {
        const ds = this.model.getDefaultDataSource();
        return ds.getFrame() < ds.getFramesCount();
    }
    getSelectedRowKey() {
        return this.grid ? this.grid.getActiveRowKey() : null;
    }
    createLinkCallback = key => {
        return PageController.createLink({
            page: this.getModel().getAttr('itemEditPage'),
            ...DataSource.keyToParams(key)
        });
    }
}
window.QForms.TableFormController = TableFormController;
