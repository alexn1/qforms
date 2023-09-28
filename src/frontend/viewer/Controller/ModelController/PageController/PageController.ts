import { Key, keyToKeyTuple } from '../../../../../types';
import { ModelController } from '../ModelController';
import { Helper } from '../../../../common/Helper';
import { FormController } from '../FormController/FormController';
import { DataSource } from '../../../Model/DataSource/DataSource';
import { RowFormController } from '../FormController/RowFormController/RowFormController';
import { PageView } from './PageView';
import {
    ApplicationController,
    OpenPageOptions,
} from '../ApplicationController/ApplicationController';
import { Page, PageOptions } from '../../../Model/Page/Page';

export class PageController<
    TApplicationController extends ApplicationController = ApplicationController,
> extends ModelController<Page> {
    id: string;
    forms: FormController[] = [];

    constructor(model: Page, parent: ApplicationController, id: string) {
        super(model, parent);
        if (typeof window === 'object') {
            console.debug(`${this.constructor.name}.constructor`, model, id);
        }

        if (!id) {
            throw new Error('no id');
        }
        this.id = id;
    }

    static create(
        model: Page,
        parent: ApplicationController,
        id: string,
        options: PageOptions | null = null,
    ): PageController {
        // console.debug('PageController.create', model.getName());
        const { ctrlClass } = model.getData();
        if (ctrlClass) {
            const CustomClass = Helper.getGlobalClass(ctrlClass);
            if (!CustomClass) throw new Error(`no class ${ctrlClass}`);
            return new CustomClass(model, parent, id, options);
        }
        // @ts-ignore
        return new PageController(model, parent, id, options);
    }

    init() {
        for (const form of this.getModel().forms) {
            const ctrl = FormController.create(form, this);
            ctrl.init();
            this.forms.push(ctrl);
        }
    }

    deinit() {
        console.debug('PageController.deinit: ' + this.getModel().getFullName());
        for (const form of this.forms) {
            form.deinit();
        }
        super.deinit();
    }

    onSaveAndCloseClick = async () => {
        console.debug('PageController.onSaveAndCloseClick');
        this.validate();
        if (this.isValid()) {
            try {
                this.getApp().getView().disableRerender();
                await this.getModel().update();
                console.debug('page model updated', this.getModel().getFullName());
            } finally {
                this.getApp().getView().enableRerender();
            }
            await this.getApp().closePage(this);
            if (this.getModel().getOptions().onClose) {
                this.getModel().getOptions().onClose!();
            }
        } else {
            await this.rerender();
        }
    };

    onClosePageClick = async (e) => {
        console.debug('PageController.onClosePageClick', this.getModel().getFullName());
        await this.close();
    };

    onOpenPageClick = async (e) => {
        const name = this.getModel().getName();
        const key = this.getModel().getKey();
        const link = this.createOpenInNewLink(name, key!);
        // console.debug('link', link);
        window.open(link, '_blank');
    };

    createOpenInNewLink(pageName: string, key: Key) {
        return this.getApp()
            .getHostApp()
            .createLink({
                page: pageName,
                ...DataSource.keyToParams(key),
            });
    }

    async close(): Promise<void> {
        // console.debug('PageController.close', this.getModel().getFullName());
        const changed = this.isChanged();
        // console.debug('changed:', changed);
        // const valid = this.isValid();
        // console.debug('valid:', valid);
        if (this.getModel().hasRowFormWithDefaultSqlDataSource() && changed) {
            const result = await this.getApp().confirm({
                message: this.getModel().getApp().getText().form.areYouSure,
            });
            if (!result) return;
        }
        await this.getApp().closePage(this);
        if (this.getModel().getOptions().onClose) {
            this.getModel().getOptions().onClose!();
        }
    }

    validate(): void {
        for (const form of this.forms) {
            if (form instanceof RowFormController) {
                form.validate();
            }
        }
    }

    isValid(): boolean {
        // console.debug('PageController.isValid', this.getModel().getFullName());
        for (const form of this.forms) {
            if (!form.isValid()) {
                return false;
            }
        }
        return true;
    }

    async onFormChange(e): Promise<void> {
        // console.debug('PageController.onFormChange', this.getModel().getFullName());
        this.rerender();
    }

    onFormDiscard(formController: FormController): void {
        console.debug('PageController.onFormDiscard', this.getModel().getFullName());
        this.rerender();
    }

    onFormUpdate(e): void {
        console.debug('PageController.onFormUpdate:', this.getModel().getFullName(), e);
        this.rerender();
    }

    onFormInsert(e): void {
        console.debug('PageController.onFormInsert:', this.getModel().getFullName());
        // console.debug('hasNew:', this.getModel().hasNew());
        for (const form of this.forms) {
            form.invalidate();
        }
        this.rerender();
    }

    async openPage(options: OpenPageOptions) {
        if (!options.params) {
            options.params = {};
        }
        const params = this.getModel().getParams();
        for (const name in params) {
            if (!options.params[name]) {
                options.params[name] = params[name];
            }
        }
        return await this.getApp().openPage(options);
    }

    isChanged(): boolean {
        // console.debug('PageController.isChanged', this.getModel().getFullName());
        for (const form of this.forms) {
            if (form.isChanged()) {
                // console.debug(`FORM CHANGED: ${form.getModel().getFullName()}`);
                return true;
            }
        }
        return false;
    }

    getApp(): TApplicationController {
        return this.getParent() as TApplicationController;
    }

    getViewClass(): typeof PageView {
        return super.getViewClass() || PageView;
    }

    findForm<TFormController extends FormController = FormController>(
        name: string,
    ): TFormController | undefined {
        return this.forms.find((form) => form.getModel().getName() === name) as TFormController;
    }

    getForm<TFormController extends FormController = FormController>(
        name: string,
    ): TFormController {
        const form = this.findForm<TFormController>(name);
        if (!form) throw new Error(`${this.getModel().getFullName()}: no form controller ${name}`);
        return form;
    }

    async onActionClick(name: string): Promise<any> {
        console.debug('PageController.onActionClick', name);
    }

    onKeyDown = async (e) => {
        // console.debug('PageController.onKeyDown', this.getModel().getFullName(), e);
        if (e.key === 'Escape') {
            if (this.isModal()) {
                await this.close();
            }
        }
    };

    getKeyPart(key: Key): string {
        const arr = keyToKeyTuple(key);
        if (arr.length === 1 && typeof arr[0] === 'number') {
            return `#${arr[0]}`;
        }
        return `${key}`;
    }

    getTitle(): string {
        const model = this.getModel();
        const key = model.getKey();
        const keyPart = key ? this.getKeyPart(key) : null;
        return [
            model.getCaption(),
            ...(this.getApp().isDebugMode() ? [`(${this.getId()})`] : []),
            ...(keyPart ? [keyPart] : []),
        ].join(' ');
    }

    getSelectedRowKey() {
        for (const form of this.forms) {
            const selectedRowKey = form.getSelectedRowKey();
            if (selectedRowKey) return selectedRowKey;
        }
        return null;
    }

    onSelectClick = async (e) => {
        console.debug('PageController.onSelectClick');
        await this.selectRow(this.getSelectedRowKey());
    };

    onResetClick = async (e) => {
        console.debug('PageController.onResetClick');
        await this.selectRow(null);
    };

    async selectRow(key: Key | null) {
        console.debug('PageController.selectRow', key);
        await this.close();
        await this.getModel().getOptions().onSelect!(key);
    }

    invalidate() {
        this.forms.forEach((form) => form.invalidate());
    }

    getId(): string {
        return this.id;
    }

    isModal(): boolean {
        return this.getModel().isModal();
    }

    isAutoFocus(): boolean {
        for (const form of this.forms) {
            if (form.isAutoFocus()) {
                return true;
            }
        }
        return false;
    }
}

Helper.registerGlobalClass(PageController);
