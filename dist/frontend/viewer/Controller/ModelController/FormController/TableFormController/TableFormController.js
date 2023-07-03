"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableFormController = void 0;
const FormController_1 = require("../FormController");
const TableFormView_1 = require("./TableFormView");
const DataSource_1 = require("../../../../Model/DataSource/DataSource");
const common_1 = require("../../../../../common");
class TableFormController extends FormController_1.FormController {
    constructor() {
        super(...arguments);
        this.fields = {};
        this.state = {
            updated: Date.now(),
        };
        this.grid = null;
        this.onGridCreate = (grid) => {
            this.grid = grid;
        };
        this.onNewClick = async (e) => {
            console.debug('TableFormController.onNewClick');
            await this.new();
        };
        this.onRefreshClick = async (e) => {
            console.debug('TableFormController.onRefreshClick', this.getModel().getFullName());
            await this.getModel().refresh();
            // console.error('refresh error handler:', err.message);
            // alert(err.message);
        };
        this.onDeleteClick = async (e) => {
            console.debug('TableFormController.onDeleteClick', this.getModel().getFullName(), this.grid.getActiveRowKey());
            const result = await this.getApp().confirm({
                message: this.getModel().getApp().getText().form.areYouSure,
            });
            if (result) {
                await this.getModel().getDefaultDataSource().delete(this.grid.getActiveRowKey());
            }
        };
        this.onGridCellDblClick = async (row, key) => {
            // console.debug('TableFormController.onGridCellDblClick', row);
            // const bodyCell = e.bodyCell;
            // const row = bodyCell.bodyRow.dbRow;
            // console.debug('row:', row);
            // const key = this.getModel().getDefaultDataSource().getRowKey(row);
            // console.debug('key:', key);
            switch (this.getModel().getAttr('editMethod')) {
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
            console.debug('TableFormController.onGridLinkClick', key);
            await this.edit(key);
        };
        this.onGridDeleteKeyDown = async (row, key) => {
            console.debug('TableFormController.onGridDeleteKeyDown', row, key);
            if (this.getModel().getAttr('deleteRowMode') !== 'disabled') {
                const result = await this.getApp().confirm({
                    message: this.getModel().getApp().getText().form.areYouSure,
                });
                if (result) {
                    await this.getModel().getDefaultDataSource().delete(key);
                }
            }
        };
        this.onModelRefresh = async (e) => {
            console.debug('TableFormController.onModelRefresh', this.getModel().getFullName(), e);
            if (!this.view)
                return;
            this.invalidate();
            await this.rerender();
        };
        this.onModelInsert = async (e) => {
            console.debug('TableFormController.onModelInsert', this.getModel().getFullName(), e);
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
            console.debug('TableFormController.onModelUpdate', this.getModel().getFullName(), e, this.view);
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
            console.debug('TableFormController.onModelDelete', this.getModel().getFullName(), e);
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
            // console.debug('TableFormController.onGridSelectionChange', key);
            this.invalidate();
            await this.getPage().rerender();
        };
        this.isRowSelected = () => {
            // console.debug('TableFormController.isRowSelected');
            return !!this.grid && !!this.grid.getActiveRowKey();
        };
        this.onFrameChanged = async (value) => {
            console.debug('TableFormController.onFrameChanged', value);
            let frame = parseInt(value);
            console.debug('frame:', frame);
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
            console.debug('TableFormController.onNextClick');
            const frame = this.getModel().getDefaultDataSource().getFrame() + 1;
            this.getModel().getDefaultDataSource().setFrame(frame);
            this.getModel().getDefaultDataSource().refresh();
            await this.rerender();
        };
        this.onPreviousClick = async () => {
            console.debug('TableFormController.onPreviousClick');
            const frame = this.getModel().getDefaultDataSource().getFrame() - 1;
            this.getModel().getDefaultDataSource().setFrame(frame);
            this.getModel().getDefaultDataSource().refresh();
            this.rerender();
        };
    }
    getViewClass() {
        return super.getViewClass() || TableFormView_1.TableFormView;
    }
    init() {
        super.init();
        // this.parent.on('hide', this.onHidePage);
        // this.parent.on('show', this.onShowPage);
        this.getModel().on('refresh', this.onModelRefresh);
        this.getModel().on('update', this.onModelUpdate);
        this.getModel().on('delete', this.onModelDelete);
        this.getModel().on('insert', this.onModelInsert);
    }
    deinit() {
        // this.parent.off('hide', this.onHidePage);
        // this.parent.off('show', this.onShowPage);
        this.getModel().off('refresh', this.onModelRefresh);
        this.getModel().off('update', this.onModelUpdate);
        this.getModel().off('delete', this.onModelDelete);
        this.getModel().off('insert', this.onModelInsert);
        super.deinit();
    }
    /*onHidePage = async () => {
        this.grid.saveScroll();
    }*/
    /*onShowPage = async () => {
        console.debug('TableFormController.onShowPage', this.getModel().getFullName());
        if (!this.grid.isHidden()) {
            this.grid.restoreScroll();
            this.grid.focus();
            // console.debug('document.activeElement:', document.activeElement);
        }
    }*/
    async new() {
        if (this.getModel().getAttr('newRowMode') === 'oneclick') {
            const row = {};
            this.getModel().fillDefaultValues(row);
            await this.getModel().getDefaultDataSource().insert(row);
        }
        else if (this.getModel().getAttr('newRowMode') === 'editform') {
            if (!this.getModel().getAttr('itemEditPage')) {
                throw new Error(`[${this.getModel().getFullName()}] itemEditPage is empty`);
            }
            await this.openPage({
                name: this.getModel().getAttr('itemEditPage'),
                newMode: true,
                modal: true,
            });
        }
        else if (this.getModel().getAttr('newRowMode') === 'createform') {
            if (!this.getModel().getAttr('itemCreatePage')) {
                throw new Error(`[${this.getModel().getFullName()}] itemCreatePage is empty`);
            }
            await this.openPage({
                name: this.getModel().getAttr('itemCreatePage'),
                newMode: true,
                modal: true,
            });
        }
        else if (this.getModel().getAttr('newRowMode') === 'oneclick editform') {
            if (!this.getModel().getAttr('itemEditPage')) {
                throw new Error(`[${this.getModel().getFullName()}] itemEditPage is empty`);
            }
            const row = {};
            this.getModel().fillDefaultValues(row);
            const result = await this.getModel().getDefaultDataSource().insert(row);
            const database = this.getModel().getDefaultDataSource().getAttr('database');
            const table = this.getModel().getDefaultDataSource().getAttr('table');
            const [key] = result[database][table].insert;
            await this.openPage({
                name: this.getModel().getAttr('itemEditPage'),
                // key  : key,
                modal: true,
                params: Object.assign({}, DataSource_1.DataSource.keyToParams(key)),
            });
        }
        else if (this.getModel().getAttr('newRowMode') === 'oneclick createform') {
            if (!this.getModel().getAttr('itemCreatePage')) {
                throw new Error(`[${this.getModel().getFullName()}] itemCreatePage is empty`);
            }
            const row = {};
            this.getModel().fillDefaultValues(row);
            const result = await this.getModel().getDefaultDataSource().insert(row);
            const database = this.getModel().getDefaultDataSource().getAttr('database');
            const table = this.getModel().getDefaultDataSource().getAttr('table');
            const [key] = result[database][table].insert;
            await this.openPage({
                name: this.getModel().getAttr('itemCreatePage'),
                // key  : key,
                modal: true,
                params: Object.assign({}, DataSource_1.DataSource.keyToParams(key)),
            });
        }
    }
    async edit(key) {
        // console.debug('TableForm.edit', this.getModel().getFullName(), key);
        if (!this.getModel().getAttr('itemEditPage')) {
            throw new Error(`${this.getModel().getFullName()}: itemEditPage is empty`);
        }
        try {
            await this.openPage({
                name: this.getModel().getAttr('itemEditPage'),
                modal: true,
                params: Object.assign({}, DataSource_1.DataSource.keyToParams(key)),
            });
        }
        catch (err) {
            // console.error(`${this.getModel().getFullName()}: edit form error handler:`, err);
            // alert(`${this.getModel().getFullName()}: ${err.message}`);
            err.message = `${this.getModel().getFullName()} edit: ${err.message}`;
            throw err;
        }
    }
    getActiveRow() {
        const key = this.grid.getActiveRowKey();
        if (!key)
            throw new Error(`${this.getModel().getFullName()}: no active row key`);
        return this.getModel().getDefaultDataSource().getRow(key);
    }
    canPrev() {
        return this.getModel().getDefaultDataSource().getFrame() > 1;
    }
    canNext() {
        const ds = this.getModel().getDefaultDataSource();
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
