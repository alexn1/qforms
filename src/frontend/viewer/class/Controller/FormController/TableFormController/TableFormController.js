'use strict';

class TableFormController extends FormController {
    constructor(model, parent) {
        super(model, parent);
        this.state = {
            updated     : Date.now(),
            activeRowKey: null
        };
    }

    init() {
        super.init();
        // this.parent.on('hide', this.listeners.hide = this.onHidePage.bind(this));
        // this.parent.on('show', this.listeners.show = this.onShowPage.bind(this));
        this.model.on('refresh', this.listeners.refresh = this.onModelRefresh);
        this.model.on('update' , this.listeners.update  = this.onModelUpdate);
        this.model.on('delete' , this.listeners.delete  = this.onModelDelete);
        this.model.on('insert' , this.listeners.insert  = this.onModelInsert);
    }
    getGridColumns() {
        return Object.keys(this.model.fields).filter(name => this.model.fields[name].isVisible()).map(name => {
            const field = this.model.fields[name];
            return {
                name : field.getName(),
                title: field.getCaption(),
                width: field.getWidth()
            };
        });
    }
    getGridRows() {
        return this.model.getDataSource().getRows();
    }
    deinit() {
        // this.parent.off('hide', this.listeners.hide);
        // this.parent.off('show', this.listeners.show);
        this.model.off('refresh', this.listeners.refresh);
        this.model.off('update' , this.listeners.update);
        this.model.off('delete' , this.listeners.delete);
        this.model.off('insert' , this.listeners.insert);
        super.deinit();
    }

    onNewClick = async e => {
        await this.new();
    }

    onRefreshClick = async e => {
        console.log('TableFormController.onRefreshClick', this.model.getFullName());
        await this.model.getDataSource().refresh();
        // console.error('refresh error handler:', err.message);
        // alert(err.message);
    }

    onDeleteClick = e => {
        console.log('TableFormController.onDeleteClick', this.model.getFullName(), this.state.activeRowKey);
        if (confirm(this.model.getApp().getText().form.areYouSure)) {
            this.model.getDataSource().delete(this.state.activeRowKey);
        }
    }

    onGridCellDblClick = async (row) => {
        // console.log('TableFormController.onGridCellDblClick', row);
        // const bodyCell = e.bodyCell;
        // const row = bodyCell.bodyRow.dbRow;
        // console.log('row:', row);
        const key = this.model.getDataSource().getRowKey(row);
        // console.log('key:', key);
        switch (this.model.data.editMethod) {
            // case 'table':
            //     this.grid.gridColumns[bodyCell.qFieldName].beginEdit(bodyCell);
            // break;
            case 'form':
                await this.edit(key);
            break;
        }
    }

    onHidePage() {
        // this.grid.saveScroll();
    }

    onShowPage() {
        console.log('TableFormController.onShowPage', this.model.getFullName());
        /*if (!this.grid.isHidden()) {
            this.grid.restoreScroll();
            this.grid.focus();
            // console.log('document.activeElement:', document.activeElement);
        }*/
    }

    async new() {
        if (this.model.data.newRowMode === 'oneclick') {
            const row = {};
            this.model.fillDefaultValues(row);
            this.model.getDataSource().insert(row);
        } else if (this.model.data.newRowMode === 'editform') {
            if (!this.model.data.itemEditPage) {
                throw new Error(`[${this.model.getFullName()}] itemEditPage is empty`);
            }
            await this.openPage({
                name   : this.model.data.itemEditPage,
                newMode: true,
                modal  : true
            });
        } else if (this.model.data.newRowMode === 'createform') {
            if (!this.model.data.itemCreatePage) {
                throw new Error(`[${this.model.getFullName()}] itemCreatePage is empty`);
            }
            await this.openPage({
                name   : this.model.data.itemCreatePage,
                newMode: true
            });
        } else if (this.model.data.newRowMode === 'oneclick editform') {
            if (!this.model.data.itemEditPage) {
                throw new Error(`[${this.model.getFullName()}] itemEditPage is empty`);
            }
            const row = {};
            this.model.fillDefaultValues(row);
            const key = await this.model.getDataSource().insert(row);
            await this.openPage({
                name: this.model.data.itemEditPage,
                key : key
            });
        } else if (this.model.data.newRowMode === 'oneclick createform') {
            if (!this.model.data.itemCreatePage) {
                throw new Error(`[${this.model.getFullName()}] itemCreatePage is empty`);
            }
            const row = {};
            this.model.fillDefaultValues(row);
            const key2 = await this.model.getDataSource().insert(row);
            await this.openPage({
                name: this.model.data.itemCreatePage,
                key : key2
            });
        }
    }

    async edit(key) {
        console.log('TableForm.edit', this.model.getFullName(), key);
        if (!this.model.data.itemEditPage) {
            throw new Error(`${this.model.getFullName()}: itemEditPage is empty`);
        }
        try {
            await this.openPage({
                name : this.model.data.itemEditPage,
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
        const rows = this.model.getDataSource().getRows();
        this.state.activeRowKey = this.model.getDataSource().getRowKey(rows[i]);
        this.rerender();
    }
    getActiveRowIndex = () => {
        // console.log('TableFormController.getActiveRowIndex', this.state.activeRowKey);
        if (this.state.activeRowKey) {
            const rows = this.model.getDataSource().getRows();
            const row = this.model.getDataSource().getRowByKey(this.state.activeRowKey);
            if (row) {
                const i = rows.indexOf(row);
                if (i === -1) throw new Error('cannot find active row')
                return i;
            } else {
                // console.log('rows:', rows);
                // console.log('this.rowsByKey:', this.model.getDataSource().rowsByKey);
                console.error('no active row in rows');
            }
        }
        return null;
    }
    isRowSelected = () => {
        // console.log('TableFormController.isRowSelected');
        if (this.state.activeRowKey !== null) {
            const row = this.model.getDataSource().getRowByKey(this.state.activeRowKey);
            if (row) return true;
        }
        return false;
    }
    onFrameChanged = value => {
        // console.log('TableFormController.onFrameChanged', parseInt(value));
        const frame = parseInt(value);
        this.model.getDataSource().setFrame(frame);
        this.model.getDataSource().refresh();
        this.rerender();
    }
    onNextClick = () => {
        console.log('TableFormController.onNextClick');
        const frame = this.model.getDataSource().getFrame() + 1;
        this.model.getDataSource().setFrame(frame);
        this.model.getDataSource().refresh();
        this.rerender();
    }

    onPreviousClick = () => {
        console.log('TableFormController.onPreviousClick');
        const frame = this.model.getDataSource().getFrame() - 1;
        this.model.getDataSource().setFrame(frame);
        this.model.getDataSource().refresh();
        this.rerender();
    }
    canPrev() {
        return this.model.getDataSource().getFrame() > 1;
    }
    canNext() {
        const ds = this.model.getDataSource();
        return ds.getFrame() < ds.getFramesCount();
    }
}
