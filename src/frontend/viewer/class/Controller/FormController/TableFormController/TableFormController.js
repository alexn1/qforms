class TableFormController extends FormController {
    constructor(model, parent) {
        super(model, parent);
        this.state = {
            updated     : Date.now(),
            activeRowKey: null
        };
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
    onDeleteClick = e => {
        console.log('TableFormController.onDeleteClick', this.model.getFullName(), this.state.activeRowKey);
        if (confirm(this.model.getApp().getText().form.areYouSure)) {
            this.model.getDefaultDataSource().delete(this.state.activeRowKey);
        }
    }
    onGridCellDblClick = async (row) => {
        // console.log('TableFormController.onGridCellDblClick', row);
        // const bodyCell = e.bodyCell;
        // const row = bodyCell.bodyRow.dbRow;
        // console.log('row:', row);
        const key = this.model.getDefaultDataSource().getRowKey(row);
        // console.log('key:', key);
        switch (this.model.getAttr('editMethod')) {
            // case 'table':
            //     this.grid.gridColumns[bodyCell.qFieldName].beginEdit(bodyCell);
            // break;
            case 'form':
                await this.edit(key);
            break;
        }
    }
    onHidePage = () => {
        // this.grid.saveScroll();
    }
    onShowPage = () => {
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
            const key = await this.model.getDefaultDataSource().insert(row);
            await this.openPage({
                name : this.model.getAttr('itemEditPage'),
                key  : key,
                modal: true
            });
        } else if (this.model.getAttr('newRowMode') === 'oneclick createform') {
            if (!this.model.getAttr('itemCreatePage')) {
                throw new Error(`[${this.model.getFullName()}] itemCreatePage is empty`);
            }
            const row = {};
            this.model.fillDefaultValues(row);
            const key2 = await this.model.getDefaultDataSource().insert(row);
            await this.openPage({
                name : this.model.getAttr('itemCreatePage'),
                key  : key2,
                modal: true
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
                key  : key,
                modal: true
            });
        } catch (err) {
            console.error(`${this.model.getFullName()}: edit form error handler:`, err);
            alert(`${this.model.getFullName()}: ${err.message}`);
        }
    }
    onModelRefresh = e => {
        console.log('TableFormController.onModelRefresh', this.model.getFullName(), e);
        this.invalidate();
        this.rerender();
    }
    onModelUpdate = e => {
        console.log('TableFormController.onModelUpdate', this.model.getFullName(), e.key);
        this.invalidate();
        this.rerender();
    }
    onModelDelete = e => {
        console.log('TableFormController.onModelDelete', this.model.getFullName(), e.key);
        if (this.state.activeRowKey === e.key) {
            this.state.activeRowKey = null;
        }
        this.invalidate();
        this.rerender();
    }
    onModelInsert = e => {
        console.log('TableFormController.onModelInsert', this.model.getFullName(), e.key);
        this.state.activeRowKey = e.key;
        this.invalidate();
        this.rerender();
    }
    onActiveRowChange = i => {
        // console.log('TableFormController.onActiveRowChange', i);
        const rows = this.model.getDefaultDataSource().getRows();
        this.state.activeRowKey = this.model.getDefaultDataSource().getRowKey(rows[i]);
        this.invalidate();
        this.rerender();
    }
    getActiveRowIndex = () => {
        // console.log('TableFormController.getActiveRowIndex', this.state.activeRowKey);
        if (this.state.activeRowKey) {
            const rows = this.model.getDefaultDataSource().getRows();
            const row = this.model.getDefaultDataSource().getRowByKey(this.state.activeRowKey);
            if (row) {
                const i = rows.indexOf(row);
                if (i === -1) throw new Error('cannot find active row')
                return i;
            } else {
                // console.log('rows:', rows);
                // console.log('this.rowsByKey:', this.model.getDefaultDataSource().rowsByKey);
                console.error('no active row in rows');
            }
        }
        return null;
    }
    getActiveRow() {
        if (!this.state.activeRowKey) throw new Error(`${this.model.getFullName()}: no active row key`);
        return this.model.getDefaultDataSource().getRowByKey(this.state.activeRowKey);
    }
    isRowSelected = () => {
        // console.log('TableFormController.isRowSelected');
        if (this.state.activeRowKey !== null) {
            const row = this.model.getDefaultDataSource().getRowByKey(this.state.activeRowKey);
            if (row) return true;
        }
        return false;
    }
    onFrameChanged = value => {
        // console.log('TableFormController.onFrameChanged', parseInt(value));
        const frame = parseInt(value);
        this.model.getDefaultDataSource().setFrame(frame);
        this.model.getDefaultDataSource().refresh();
        this.rerender();
    }
    onNextClick = () => {
        console.log('TableFormController.onNextClick');
        const frame = this.model.getDefaultDataSource().getFrame() + 1;
        this.model.getDefaultDataSource().setFrame(frame);
        this.model.getDefaultDataSource().refresh();
        this.rerender();
    }

    onPreviousClick = () => {
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
}
