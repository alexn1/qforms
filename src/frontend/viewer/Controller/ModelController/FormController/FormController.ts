import { ModelController } from '../ModelController';
import { FrontHostApp } from '../../../../common';
import { FieldController } from '../FieldController/FieldController';
import { PageController } from '../PageController/PageController';
import { Form } from '../../../Model/Form/Form';
import { Field } from '../../../Model/Field/Field';
import {
    ApplicationController,
    OpenPageOptions,
} from '../ApplicationController/ApplicationController';

export class FormController<TForm extends Form = Form> extends ModelController<TForm> {
    fields: { [name: string]: FieldController } = {};
    state: any;

    static create(model: Form, parent: PageController): FormController {
        // console.log('FormController.create', model.getFullName());
        const { ctrlClass } = model.getData();
        if (ctrlClass) {
            const CustomClass = FrontHostApp.getClassByName(ctrlClass);
            if (!CustomClass) throw new Error(`no class ${ctrlClass}`);
            return new CustomClass(model, parent);
        }
        const GeneralClass = FrontHostApp.getClassByName(`${model.getClassName()}Controller`);
        return new GeneralClass(model, parent);
    }

    constructor(model: TForm, parent: PageController) {
        super(model, parent);
        console.log(`${this.constructor.name}.constructor`, model);
    }

    init() {
        for (const field of this.model.fields) {
            const ctrl = (this.fields[field.getName()] = FieldController.create(field, this));
            ctrl.init();
        }
    }

    deinit() {
        // console.log('FormController.deinit:', this.model.getFullName());
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
        return this.parent;
    }

    isChanged(): boolean {
        return false;
    }

    async onFieldChange(e) {
        // console.log('FormController.onFieldChange', this.model.getFullName());
        await this.getPage().onFormChange(e);
    }

    getUpdated() {
        return this.state.updated;
    }

    invalidate(): void {
        this.state.updated = Date.now();
    }

    async onActionClick(name, row): Promise<any> {
        console.log('FormController.onActionClick', name, row);
    }

    getField<TFieldController extends FieldController = FieldController>(
        name: string,
    ): TFieldController {
        return this.fields[name] as TFieldController;
    }

    getApp(): ApplicationController {
        return this.parent.parent;
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
}

// @ts-ignore
window.FormController = FormController;
