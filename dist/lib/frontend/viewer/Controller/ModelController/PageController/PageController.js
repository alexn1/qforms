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
            console.log('PageController.onSaveAndCloseClick');
            this.validate();
            if (this.isValid()) {
                try {
                    this.getApp().getView().disableRerender();
                    await this.getModel().update();
                    console.log('page model updated', this.getModel().getFullName());
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
            console.log('PageController.onClosePageClick', this.getModel().getFullName());
            await this.close();
        };
        this.onOpenPageClick = async (e) => {
            const name = this.getModel().getName();
            const key = this.getModel().getKey();
            const link = this.createOpenInNewLink(name, key);
            // console.log('link', link);
            window.open(link, '_blank');
        };
        this.onKeyDown = async (e) => {
            // console.log('PageController.onKeyDown', this.getModel().getFullName(), e);
            if (e.key === 'Escape') {
                if (this.isModal()) {
                    await this.close();
                }
            }
        };
        this.onSelectClick = async (e) => {
            console.log('PageController.onSelectClick');
            await this.selectRow(this.getSelectedRowKey());
        };
        this.onResetClick = async (e) => {
            console.log('PageController.onResetClick');
            await this.selectRow(null);
        };
        if (typeof window === 'object') {
            console.log(`${this.constructor.name}.constructor`, model, id);
        }
        if (!id) {
            throw new Error('no id');
        }
        this.id = id;
    }
    static create(model, parent, id, options = null) {
        // console.log('PageController.create', model.getName());
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
        for (const form of this.model.forms) {
            const ctrl = FormController_1.FormController.create(form, this);
            ctrl.init();
            this.forms.push(ctrl);
        }
    }
    deinit() {
        console.log('PageController.deinit: ' + this.model.getFullName());
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
        // console.log('PageController.close', this.model.getFullName());
        const changed = this.isChanged();
        // console.log('changed:', changed);
        // const valid = this.isValid();
        // console.log('valid:', valid);
        if (this.model.hasRowFormWithDefaultSqlDataSource() && changed) {
            const result = await this.getApp().confirm({
                message: this.model.getApp().getText().form.areYouSure,
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
        // console.log('PageController.isValid', this.model.getFullName());
        for (const form of this.forms) {
            if (!form.isValid()) {
                return false;
            }
        }
        return true;
    }
    async onFormChange(e) {
        // console.log('PageController.onFormChange', this.model.getFullName());
        this.rerender();
    }
    onFormDiscard(formController) {
        console.log('PageController.onFormDiscard', this.model.getFullName());
        this.rerender();
    }
    onFormUpdate(e) {
        console.log('PageController.onFormUpdate:', this.model.getFullName(), e);
        this.rerender();
    }
    onFormInsert(e) {
        console.log('PageController.onFormInsert:', this.model.getFullName());
        // console.log('hasNew:', this.model.hasNew());
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
        // console.log('PageController.isChanged', this.model.getFullName());
        for (const form of this.forms) {
            if (form.isChanged()) {
                // console.log(`FORM CHANGED: ${form.model.getFullName()}`);
                return true;
            }
        }
        return false;
    }
    getApp() {
        return this.parent;
    }
    getViewClass() {
        return super.getViewClass() || PageView_1.PageView;
    }
    getForm(name) {
        return this.forms.find((form) => form.model.getName() === name);
    }
    async onActionClick(name) {
        console.log('PageController.onActionClick', name);
    }
    getTitle() {
        const model = this.getModel();
        const key = model.getKey();
        let keyPart;
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
        console.log('PageController.selectRow', key);
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
if (typeof window === 'object') {
    // @ts-ignore
    window.PageController = PageController;
}
