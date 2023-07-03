"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageController = void 0;
const ModelController_1 = require("../ModelController");
const Helper_1 = require("../../../../common/Helper");
const FormController_1 = require("../FormController/FormController");
const DataSource_1 = require("../../../Model/DataSource/DataSource");
const RowFormController_1 = require("../FormController/RowFormController/RowFormController");
const PageView_1 = require("./PageView");
class PageController extends ModelController_1.ModelController {
    constructor(model, parent, id) {
        super(model, parent);
        this.forms = [];
        this.onSaveAndCloseClick = async () => {
            console.debug('PageController.onSaveAndCloseClick');
            this.validate();
            if (this.isValid()) {
                try {
                    this.getApp().getView().disableRerender();
                    await this.getModel().update();
                    console.debug('page model updated', this.getModel().getFullName());
                }
                finally {
                    this.getApp().getView().enableRerender();
                }
                await this.getApp().closePage(this);
                if (this.getModel().getOptions().onClose) {
                    this.getModel().getOptions().onClose();
                }
            }
            else {
                await this.rerender();
            }
        };
        this.onClosePageClick = async (e) => {
            console.debug('PageController.onClosePageClick', this.getModel().getFullName());
            await this.close();
        };
        this.onOpenPageClick = async (e) => {
            const name = this.getModel().getName();
            const key = this.getModel().getKey();
            const link = this.createOpenInNewLink(name, key);
            // console.debug('link', link);
            window.open(link, '_blank');
        };
        this.onKeyDown = async (e) => {
            // console.debug('PageController.onKeyDown', this.getModel().getFullName(), e);
            if (e.key === 'Escape') {
                if (this.isModal()) {
                    await this.close();
                }
            }
        };
        this.onSelectClick = async (e) => {
            console.debug('PageController.onSelectClick');
            await this.selectRow(this.getSelectedRowKey());
        };
        this.onResetClick = async (e) => {
            console.debug('PageController.onResetClick');
            await this.selectRow(null);
        };
        if (typeof window === 'object') {
            console.debug(`${this.constructor.name}.constructor`, model, id);
        }
        if (!id) {
            throw new Error('no id');
        }
        this.id = id;
    }
    static create(model, parent, id, options = null) {
        // console.debug('PageController.create', model.getName());
        const { ctrlClass } = model.getData();
        if (ctrlClass) {
            const CustomClass = Helper_1.Helper.getGlobalClass(ctrlClass);
            if (!CustomClass)
                throw new Error(`no class ${ctrlClass}`);
            return new CustomClass(model, parent, id, options);
        }
        // @ts-ignore
        return new PageController(model, parent, id, options);
    }
    init() {
        for (const form of this.getModel().forms) {
            const ctrl = FormController_1.FormController.create(form, this);
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
    createOpenInNewLink(pageName, key) {
        return this.getApp()
            .getHostApp()
            .createLink(Object.assign({ page: pageName }, DataSource_1.DataSource.keyToParams(key)));
    }
    async close() {
        // console.debug('PageController.close', this.getModel().getFullName());
        const changed = this.isChanged();
        // console.debug('changed:', changed);
        // const valid = this.isValid();
        // console.debug('valid:', valid);
        if (this.getModel().hasRowFormWithDefaultSqlDataSource() && changed) {
            const result = await this.getApp().confirm({
                message: this.getModel().getApp().getText().form.areYouSure,
            });
            if (!result)
                return;
        }
        await this.getApp().closePage(this);
        if (this.getModel().getOptions().onClose) {
            this.getModel().getOptions().onClose();
        }
    }
    validate() {
        for (const form of this.forms) {
            if (form instanceof RowFormController_1.RowFormController) {
                form.validate();
            }
        }
    }
    isValid() {
        // console.debug('PageController.isValid', this.getModel().getFullName());
        for (const form of this.forms) {
            if (!form.isValid()) {
                return false;
            }
        }
        return true;
    }
    async onFormChange(e) {
        // console.debug('PageController.onFormChange', this.getModel().getFullName());
        this.rerender();
    }
    onFormDiscard(formController) {
        console.debug('PageController.onFormDiscard', this.getModel().getFullName());
        this.rerender();
    }
    onFormUpdate(e) {
        console.debug('PageController.onFormUpdate:', this.getModel().getFullName(), e);
        this.rerender();
    }
    onFormInsert(e) {
        console.debug('PageController.onFormInsert:', this.getModel().getFullName());
        // console.debug('hasNew:', this.getModel().hasNew());
        for (const form of this.forms) {
            form.invalidate();
        }
        this.rerender();
    }
    async openPage(options) {
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
    isChanged() {
        // console.debug('PageController.isChanged', this.getModel().getFullName());
        for (const form of this.forms) {
            if (form.isChanged()) {
                // console.debug(`FORM CHANGED: ${form.getModel().getFullName()}`);
                return true;
            }
        }
        return false;
    }
    getApp() {
        return this.getParent();
    }
    getViewClass() {
        return super.getViewClass() || PageView_1.PageView;
    }
    findForm(name) {
        return this.forms.find((form) => form.getModel().getName() === name);
    }
    getForm(name) {
        const form = this.findForm(name);
        if (!form)
            throw new Error(`${this.getModel().getFullName()}: no form controller ${name}`);
        return form;
    }
    async onActionClick(name) {
        console.debug('PageController.onActionClick', name);
    }
    getTitle() {
        const model = this.getModel();
        const key = model.getKey();
        let keyPart = null;
        if (key) {
            const arr = JSON.parse(key);
            if (arr.length === 1 && typeof arr[0] === 'number') {
                keyPart = `#${arr[0]}`;
            }
            else {
                keyPart = `${key}`;
            }
        }
        return [
            model.getCaption(),
            ...(this.getApp().getHostApp().isDebugMode() ? [`(${this.getId()})`] : []),
            ...(keyPart ? [keyPart] : []),
        ].join(' ');
    }
    getSelectedRowKey() {
        for (const form of this.forms) {
            const selectedRowKey = form.getSelectedRowKey();
            if (selectedRowKey)
                return selectedRowKey;
        }
        return null;
    }
    async selectRow(key) {
        console.debug('PageController.selectRow', key);
        await this.close();
        await this.getModel().getOptions().onSelect(key);
    }
    invalidate() {
        this.forms.forEach((form) => form.invalidate());
    }
    getId() {
        return this.id;
    }
    isModal() {
        return this.getModel().isModal();
    }
    isAutoFocus() {
        for (const form of this.forms) {
            if (form.isAutoFocus()) {
                return true;
            }
        }
        return false;
    }
}
exports.PageController = PageController;
