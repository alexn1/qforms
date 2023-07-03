import { FormController, FormControllerFields, FormControllerState } from '../FormController';
import { RowFormView } from './RowFormView';
import { RowForm } from '../../../../Model/Form/RowForm/RowForm';
import { RowFormFieldController } from '../../FieldController/RowFormFieldController/RowFormFieldController';
import { FieldController } from '../../FieldController/FieldController';
import { Helper } from '../../../../../common/Helper';
import { RawRow } from '../../../../../../types';
import { PageController } from '../../PageController/PageController';

export interface RowFormControllerFields extends FormControllerFields {
    [name: string]: RowFormFieldController;
}

export interface RowFormControllerState extends FormControllerState {
    mode: 'view' | 'edit';
    hasNew: boolean;
    changed: boolean;
    valid: boolean;
}

export class RowFormController extends FormController<RowForm> {
    fields: RowFormControllerFields = {};
    state: RowFormControllerState = {
        updated: Date.now(),
        mode: 'edit',
        hasNew: false,
        changed: false,
        valid: true,
    };

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
        // console.debug('RowFormController.deinit', this.getModel().getFullName());
        this.getModel().off('refresh', this.onModelRefresh);
        this.getModel().off('insert', this.onModelInsert);
        this.getModel().off('update', this.onModelUpdate);
        super.deinit();
    }

    calcState() {
        this.state.hasNew = this.getModel().hasNew();
        this.state.changed = this.isChanged();
        this.state.valid = this.isValid();
        // console.debug('hasNew:', hasNew);
        // console.debug('changed:', changed);
        // console.debug('valid:', valid);
    }

    refill() {
        console.debug('RowFormController.refill', this.getModel().getFullName());
        for (const name in this.fields) {
            this.fields[name].refill();
        }
    }

    onModelRefresh = async (e) => {
        console.debug('RowFormController.onModelRefresh', this.getModel().getFullName());
        if (!this.view) return;
        this.refill();
        this.invalidate();
        this.rerender();
    };

    onModelInsert = async (e) => {
        console.debug('RowFormController.onModelInsert', this.getModel().getFullName());
        this.refill();
        this.invalidate();
        this.calcState();
        (this.getParent() as PageController).onFormInsert(e);
    };

    onModelUpdate = async (e) => {
        console.debug('RowFormController.onModelUpdate', this.getModel().getFullName(), e);
        this.refill();
        this.invalidate();
        this.calcState();
        (this.getParent() as PageController).onFormUpdate(e);
    };

    isValid() {
        // console.debug('RowFormController.isValid', this.getModel().getFullName());
        for (const name in this.fields) {
            const field = this.fields[name];
            if (!field.isValid()) return false;
        }
        return true;
    }

    validate() {
        // console.debug('RowFormController.validate', this.getModel().getFullName());
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

    onSaveClick = async () => {
        console.debug('RowFormController.onSaveClick');
        this.validate();
        this.calcState();
        if (this.isValid()) {
            try {
                this.getApp().getView().disableRerender();
                await this.getModel().update();
                this.state.mode = 'view';
                console.debug('form model updated', this.getModel().getFullName());
            } finally {
                this.getApp().getView().enableRerender();
                await this.getApp().getView().rerender();
            }
        } else {
            console.error(`cannot update invalid row form: ${this.getModel().getFullName()}`);
            await this.rerender();
        }
    };

    onDiscardClick = () => {
        console.debug('RowFormController.onDiscardClick', this.getModel().getFullName());
        const changedFields: string[] = [];
        for (const name in this.fields) {
            const field = this.fields[name];
            if (field.isChanged() || !field.isValid()) {
                changedFields.push(name);
            }
        }
        // console.debug('changedFields:', changedFields);
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
        (this.getParent() as PageController).onFormDiscard(this);
    };

    onRefreshClick = async () => {
        // console.debug('RowFormController.onRefreshClick', this.getModel().getFullName());
        await this.getModel().refresh();
    };

    isChanged() {
        // console.debug('RowFormController.isChanged', this.getModel().getFullName());
        if (this.getModel().isChanged()) return true;
        for (const name in this.fields) {
            const field = this.fields[name];
            if (field.isChanged()) return true;
        }
        return false;
    }

    async onFieldChange(e) {
        // console.debug('RowFormController.onFieldChange', this.getModel().getFullName());
        this.calcState();
        this.invalidate();
        await super.onFieldChange(e);
    }

    onEditClick = (e) => {
        console.debug('RowFormController.onEditClick');
        this.state.mode = 'edit';
        this.rerender();
    };

    onCancelClick = (e) => {
        console.debug('RowFormController.onCancelClick');
        this.state.mode = 'view';
        this.rerender();
    };

    getViewClass() {
        // console.debug('RowFormController.getViewClass', this.getModel().getFullName());
        return super.getViewClass() || RowFormView;
    }

    getActiveRow(): RawRow {
        return this.getModel().getRow(true);
    }

    getRow(): RawRow {
        return this.getModel().getRow(true);
    }

    getMode() {
        return this.state.mode;
    }

    isActionEnabled(name: string) {
        return this.isViewMode();
    }

    isEditMode() {
        return this.getMode() === 'edit';
    }

    isViewMode() {
        return this.getMode() === 'view';
    }

    getField<TRowFormFieldController extends FieldController = RowFormFieldController>(
        name: string,
    ): TRowFormFieldController {
        return this.fields[name] as unknown as TRowFormFieldController;
    }
}

Helper.registerGlobalClass(RowFormController);
