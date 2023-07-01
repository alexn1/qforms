import { ModelController } from '../ModelController';
import { Helper } from '../../../../common';
import { FieldController } from '../FieldController/FieldController';
import { PageController } from '../PageController/PageController';
import { Form } from '../../../Model/Form/Form';
import {
    ApplicationController,
    OpenPageOptions,
} from '../ApplicationController/ApplicationController';
import { RawRow } from '../../../../../types';

export interface FormControllerState {
    updated: number;
}

export interface FormControllerFields {
    [name: string]: FieldController;
}

export class FormController<TForm extends Form = Form> extends ModelController<TForm> {
    fields: FormControllerFields = {};
    state: FormControllerState;

    static create(model: Form, parent: PageController): FormController {
        // console.log('FormController.create', model.getFullName());
        const { ctrlClass } = model.getData();
        if (ctrlClass) {
            const CustomClass = Helper.getGlobalClass(ctrlClass);
            if (!CustomClass) throw new Error(`no class ${ctrlClass}`);
            return new CustomClass(model, parent);
        }
        const GeneralClass = Helper.getGlobalClass(`${model.getClassName()}Controller`);
        return new GeneralClass(model, parent);
    }

    constructor(model: TForm, parent: PageController) {
        super(model, parent);
        if (typeof window === 'object') {
            console.log(`${this.constructor.name}.constructor`, model);
        }
    }

    init() {
        for (const field of this.getModel().fields) {
            const ctrl = (this.fields[field.getName()] = FieldController.create(field, this));
            ctrl.init();
        }
    }

    deinit() {
        // console.log('FormController.deinit:', this.getModel().getFullName());
        for (const name in this.fields) {
            this.fields[name].deinit();
        }
        super.deinit();
    }

    isValid() {
        return true;
    }

    async openPage(options: OpenPageOptions) {
        return await this.getPage().openPage(options);
    }

    getPage(): PageController {
        return this.getParent() as PageController;
    }

    isChanged(): boolean {
        return false;
    }

    async onFieldChange(e) {
        // console.log('FormController.onFieldChange', this.getModel().getFullName());
        await this.getPage().onFormChange(e);
    }

    getUpdated() {
        return this.state.updated;
    }

    invalidate(): void {
        this.state.updated = Date.now();
    }

    async onActionClick(name: string, row: RawRow): Promise<any> {
        console.log('FormController.onActionClick', name, row);
    }

    getField<TFieldController extends FieldController = FieldController>(
        name: string,
    ): TFieldController {
        return this.fields[name] as TFieldController;
    }

    getApp(): ApplicationController {
        return this.getParent().getParent() as ApplicationController;
    }

    getSelectedRowKey() {
        return null;
    }

    isAutoFocus() {
        for (const name in this.fields) {
            if (this.fields[name].isAutoFocus()) {
                return true;
            }
        }
        return false;
    }

    isVisible() {
        return this.getModel().getAttr('visible') === 'true';
    }

    getActiveRow(): RawRow | null {
        throw new Error('FormController.getActiveRow not implemented');
    }

    getRow(): RawRow {
        throw new Error('FormController.getRow not implemented');
    }
}
