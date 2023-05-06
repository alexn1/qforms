"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableFormController = void 0;
const TableFormView_1 = require("./TableFormView");
const FormController_1 = require("../FormController");
const DataSource_1 = require("../../../../Model/DataSource/DataSource");
const common_1 = require("../../../../../common");
class TableFormController extends FormController_1.FormController {
    constructor(model, parent) {
        super(model, parent);
        this.fields = {};
        // state: any;
        this.grid = null;
        this.onGridCreate = (grid) => {
            this.grid = grid;
        };
        this.onNewClick = async (e) => {
            console.log('TableFormController.onNewClick');
            await this.new();
        };
        this.onRefreshClick = async (e) => {
            console.log('TableFormController.onRefreshClick', this.model.getFullName());
            await this.model.refresh();
            // console.error('refresh error handler:', err.message);
            // alert(err.message);
        };
        this.onDeleteClick = async (e) => {
            console.log('TableFormController.onDeleteClick', this.model.getFullName(), this.grid.getActiveRowKey());
            const result = await this.getApp().confirm({
                message: this.model.getApp().getText().form.areYouSure,
            });
            if (result) {
                await this.model.getDefaultDataSource().delete(this.grid.getActiveRowKey());
            }
        };
        this.onGridCellDblClick = async (row, key) => {
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
                    if (this.getPage().getModel().isSelectMode()) {
                        await this.getPage().selectRow(key);
                    }
                    else {
                        await this.edit(key);
                    }
                    break;
            }
        };
        this.onGridLinkClick = async (key) => {
            console.log('TableFormController.onGridLinkClick', key);
            await this.edit(key);
        };
        this.onGridDeleteKeyDown = async (row, key) => {
            console.log('TableFormController.onGridDeleteKeyDown', row, key);
            if (this.getModel().getAttr('deleteRowMode') !== 'disabled') {
                const result = await this.getApp().confirm({
                    message: this.model.getApp().getText().form.areYouSure,
                });
                if (result) {
                    await this.model.getDefaultDataSource().delete(key);
                }
            }
        };
        this.onModelRefresh = async (e) => {
            console.log('TableFormController.onModelRefresh', this.model.getFullName(), e);
            if (!this.view)
                return;
            this.invalidate();
            await this.rerender();
        };
        this.onModelInsert = async (e) => {
            console.log('TableFormController.onModelInsert', this.model.getFullName(), e);
            if (!this.view)
                return;
            if (this.grid && e.source) {
                for (const key of e.inserts) {
                    this.grid.setActiveRowKey(key);
                }
            }
            this.invalidate();
            await this.rerender();
        };
        this.onModelUpdate = async (e) => {
            console.log('TableFormController.onModelUpdate', this.model.getFullName(), e, this.view);
            if (!this.view)
                return;
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
        };
        this.onModelDelete = async (e) => {
            console.log('TableFormController.onModelDelete', this.model.getFullName(), e);
            if (!this.view)
                return;
            if (this.grid) {
                for (const key of e.deletes) {
                    if (this.grid.getActiveRowKey() === key) {
                        this.grid.setActiveRowKey(null);
                    }
                }
            }
            this.invalidate();
            await this.rerender();
        };
        this.onGridSelectionChange = async (key) => {
            // console.log('TableFormController.onGridSelectionChange', key);
            this.invalidate();
            await this.getPage().rerender();
        };
        this.isRowSelected = () => {
            // console.log('TableFormController.isRowSelected');
            return !!this.grid && !!this.grid.getActiveRowKey();
        };
        this.onFrameChanged = async (value) => {
            console.log('TableFormController.onFrameChanged', value);
            let frame = parseInt(value);
            console.log('frame:', frame);
            const frameCount = this.getModel().getDefaultDataSource().getFramesCount();
            if (frame < 1)
                frame = 1;
            if (frame > frameCount)
                frame = frameCount;
            this.getModel().getDefaultDataSource().setFrame(frame);
            this.getModel().getDefaultDataSource().refresh();
            await this.rerender();
        };
        this.onNextClick = async () => {
            console.log('TableFormController.onNextClick');
            const frame = this.model.getDefaultDataSource().getFrame() + 1;
            this.model.getDefaultDataSource().setFrame(frame);
            this.model.getDefaultDataSource().refresh();
            await this.rerender();
        };
        this.onPreviousClick = async () => {
            console.log('TableFormController.onPreviousClick');
            const frame = this.model.getDefaultDataSource().getFrame() - 1;
            this.model.getDefaultDataSource().setFrame(frame);
            this.model.getDefaultDataSource().refresh();
            this.rerender();
        };
        this.state = {
            updated: Date.now(),
        };
    }
    getViewClass() {
        return super.getViewClass() || TableFormView_1.TableFormView;
    }
    init() {
        super.init();
        // this.parent.on('hide', this.onHidePage);
        // this.parent.on('show', this.onShowPage);
        this.model.on('refresh', this.onModelRefresh);
        this.model.on('update', this.onModelUpdate);
        this.model.on('delete', this.onModelDelete);
        this.model.on('insert', this.onModelInsert);
    }
    deinit() {
        // this.parent.off('hide', this.onHidePage);
        // this.parent.off('show', this.onShowPage);
        this.model.off('refresh', this.onModelRefresh);
        this.model.off('update', this.onModelUpdate);
        this.model.off('delete', this.onModelDelete);
        this.model.off('insert', this.onModelInsert);
        super.deinit();
    }
    /*onHidePage = async () => {
        this.grid.saveScroll();
    }*/
    /*onShowPage = async () => {
        console.log('TableFormController.onShowPage', this.model.getFullName());
        if (!this.grid.isHidden()) {
            this.grid.restoreScroll();
            this.grid.focus();
            // console.log('document.activeElement:', document.activeElement);
        }
    }*/
    async new() {
        if (this.model.getAttr('newRowMode') === 'oneclick') {
            const row = {};
            this.model.fillDefaultValues(row);
            await this.model.getDefaultDataSource().insert(row);
        }
        else if (this.model.getAttr('newRowMode') === 'editform') {
            if (!this.model.getAttr('itemEditPage')) {
                throw new Error(`[${this.model.getFullName()}] itemEditPage is empty`);
            }
            await this.openPage({
                name: this.model.getAttr('itemEditPage'),
                newMode: true,
                modal: true,
            });
        }
        else if (this.model.getAttr('newRowMode') === 'createform') {
            if (!this.model.getAttr('itemCreatePage')) {
                throw new Error(`[${this.model.getFullName()}] itemCreatePage is empty`);
            }
            await this.openPage({
                name: this.model.getAttr('itemCreatePage'),
                newMode: true,
                modal: true,
            });
        }
        else if (this.model.getAttr('newRowMode') === 'oneclick editform') {
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
                name: this.model.getAttr('itemEditPage'),
                // key  : key,
                modal: true,
                params: Object.assign({}, DataSource_1.DataSource.keyToParams(key)),
            });
        }
        else if (this.model.getAttr('newRowMode') === 'oneclick createform') {
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
                name: this.model.getAttr('itemCreatePage'),
                // key  : key,
                modal: true,
                params: Object.assign({}, DataSource_1.DataSource.keyToParams(key)),
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
                name: this.model.getAttr('itemEditPage'),
                modal: true,
                params: Object.assign({}, DataSource_1.DataSource.keyToParams(key)),
            });
        }
        catch (err) {
            // console.error(`${this.model.getFullName()}: edit form error handler:`, err);
            // alert(`${this.model.getFullName()}: ${err.message}`);
            err.message = `${this.model.getFullName()} edit: ${err.message}`;
            throw err;
        }
    }
    getActiveRow() {
        const key = this.grid.getActiveRowKey();
        if (!key)
            throw new Error(`${this.model.getFullName()}: no active row key`);
        return this.model.getDefaultDataSource().getRow(key);
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
    isActionEnabled(name) {
        return this.isRowSelected();
    }
    getField(name) {
        return this.fields[name];
    }
}
exports.TableFormController = TableFormController;
common_1.Helper.registerGlobalClass(TableFormController);
