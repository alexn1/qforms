"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RowFormController = void 0;
const FormController_1 = require("../FormController");
const RowFormView_1 = require("./RowFormView");
const Helper_1 = require("../../../../../common/Helper");
class RowFormController extends FormController_1.FormController {
    constructor() {
        super(...arguments);
        this.fields = {};
        this.state = {
            updated: Date.now(),
            mode: 'edit',
            hasNew: false,
            changed: false,
            valid: true,
        };
        this.onModelRefresh = async (e) => {
            console.log('RowFormController.onModelRefresh', this.getModel().getFullName());
            if (!this.view)
                return;
            this.refill();
            this.invalidate();
            this.rerender();
        };
        this.onModelInsert = async (e) => {
            console.log('RowFormController.onModelInsert', this.getModel().getFullName());
            this.refill();
            this.invalidate();
            this.calcState();
            this.getParent().onFormInsert(e);
        };
        this.onModelUpdate = async (e) => {
            console.log('RowFormController.onModelUpdate', this.getModel().getFullName(), e);
            this.refill();
            this.invalidate();
            this.calcState();
            this.getParent().onFormUpdate(e);
        };
        this.onSaveClick = async () => {
            console.log('RowFormController.onSaveClick');
            this.validate();
            this.calcState();
            if (this.isValid()) {
                try {
                    this.getApp().getView().disableRerender();
                    await this.getModel().update();
                    this.state.mode = 'view';
                    console.log('form model updated', this.getModel().getFullName());
                }
                finally {
                    this.getApp().getView().enableRerender();
                    await this.getApp().getView().rerender();
                }
            }
            else {
                console.error(`cannot update invalid row form: ${this.getModel().getFullName()}`);
                await this.rerender();
            }
        };
        this.onDiscardClick = () => {
            console.log('RowFormController.onDiscardClick', this.getModel().getFullName());
            const changedFields = [];
            for (const name in this.fields) {
                const field = this.fields[name];
                if (field.isChanged() || !field.isValid()) {
                    changedFields.push(name);
                }
            }
            // console.log('changedFields:', changedFields);
            this.getModel().discard(changedFields);
            // refill changed fields
            changedFields.forEach((name) => {
                this.fields[name].refill();
            });
            // ui
            this.calcState();
            if (this.getModel().hasDefaultPersistentDataSource()) {
                this.state.mode = 'view';
            }
            this.rerender();
            // event
            this.getParent().onFormDiscard(this);
        };
        this.onRefreshClick = async () => {
            // console.log('RowFormController.onRefreshClick', this.getModel().getFullName());
            await this.getModel().refresh();
        };
        this.onEditClick = (e) => {
            console.log('RowFormController.onEditClick');
            this.state.mode = 'edit';
            this.rerender();
        };
        this.onCancelClick = (e) => {
            console.log('RowFormController.onCancelClick');
            this.state.mode = 'view';
            this.rerender();
        };
    }
    init() {
        super.init();
        this.getModel().on('refresh', this.onModelRefresh);
        this.getModel().on('insert', this.onModelInsert);
        this.getModel().on('update', this.onModelUpdate);
        if (this.getModel().getDefaultDataSource().isPersistent()) {
            this.state.mode = 'view';
        }
        this.calcState();
        if (this.state.hasNew) {
            this.state.mode = 'edit';
        }
    }
    deinit() {
        // console.log('RowFormController.deinit', this.getModel().getFullName());
        this.getModel().off('refresh', this.onModelRefresh);
        this.getModel().off('insert', this.onModelInsert);
        this.getModel().off('update', this.onModelUpdate);
        super.deinit();
    }
    calcState() {
        this.state.hasNew = this.getModel().hasNew();
        this.state.changed = this.isChanged();
        this.state.valid = this.isValid();
        // console.log('hasNew:', hasNew);
        // console.log('changed:', changed);
        // console.log('valid:', valid);
    }
    refill() {
        console.log('RowFormController.refill', this.getModel().getFullName());
        for (const name in this.fields) {
            this.fields[name].refill();
        }
    }
    isValid() {
        // console.log('RowFormController.isValid', this.getModel().getFullName());
        for (const name in this.fields) {
            const field = this.fields[name];
            if (!field.isValid())
                return false;
        }
        return true;
    }
    validate() {
        // console.log('RowFormController.validate', this.getModel().getFullName());
        for (const name in this.fields) {
            this.fields[name].validate();
        }
        this.invalidate();
    }
    clearFieldsError() {
        for (const name in this.fields) {
            this.fields[name].setError(null);
        }
    }
    isChanged() {
        // console.log('RowFormController.isChanged', this.getModel().getFullName());
        if (this.getModel().isChanged())
            return true;
        for (const name in this.fields) {
            const field = this.fields[name];
            if (field.isChanged())
                return true;
        }
        return false;
    }
    async onFieldChange(e) {
        // console.log('RowFormController.onFieldChange', this.getModel().getFullName());
        this.calcState();
        this.invalidate();
        await super.onFieldChange(e);
    }
    getViewClass() {
        // console.log('RowFormController.getViewClass', this.getModel().getFullName());
        return super.getViewClass() || RowFormView_1.RowFormView;
    }
    getActiveRow() {
        return this.getModel().getRow(true);
    }
    getRow() {
        return this.getModel().getRow(true);
    }
    getMode() {
        return this.state.mode;
    }
    isActionEnabled(name) {
        return this.isViewMode();
    }
    isEditMode() {
        return this.getMode() === 'edit';
    }
    isViewMode() {
        return this.getMode() === 'view';
    }
    getField(name) {
        return this.fields[name];
    }
}
exports.RowFormController = RowFormController;
Helper_1.Helper.registerGlobalClass(RowFormController);
