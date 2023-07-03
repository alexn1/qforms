"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageView = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const ModelView_1 = require("../ModelView");
const common_1 = require("../../../../common");
require("./PageView.less");
class PageView extends ModelView_1.ModelView {
    constructor(props) {
        super(props);
        this.onActionsClick = async (li) => {
            // console.log('PageView.onActionsClick:', li);
            const ctrl = this.getCtrl();
            const name = li.dataset.action;
            try {
                const result = await ctrl.onActionClick(name);
                if (!result) {
                    throw new Error(`no handler for action '${name}'`);
                }
            }
            catch (err) {
                console.error(err);
                await this.getCtrl().getApp().alert({ message: err.message });
            }
        };
        this.checkParent();
        this.el = react_1.default.createRef();
    }
    isToolbar() {
        const model = this.getCtrl().getModel();
        return model.hasActions();
        //|| (model.isModal() && model.hasRowFormWithDefaultSqlDataSource())
        //|| model.isSelectMode();
    }
    getFormTabs(forms) {
        return forms.map((form) => {
            return {
                name: form.getModel().getName(),
                title: form.getTitle(),
                content: this.renderForm(form),
            };
        });
    }
    getRowForms() {
        return this.getCtrl()
            .forms.filter((form) => form.getModel().getClassName() === 'RowForm')
            .filter((form) => form.isVisible());
    }
    getTableForms() {
        return this.getCtrl()
            .forms.filter((form) => form.getModel().getClassName() === 'TableForm')
            .filter((form) => form.isVisible());
    }
    renderForm(formCtrl, props = {}) {
        return react_1.default.createElement(formCtrl.getViewClass(), Object.assign({ parent: this, key: formCtrl.getModel().getName(), ctrl: formCtrl, onCreate: formCtrl.onViewCreate, updated: formCtrl.getUpdated() }, props));
    }
    renderRowForms() {
        return this.getRowForms().map((form) => this.renderForm(form));
    }
    renderTitle() {
        const ctrl = this.getCtrl();
        const model = ctrl.getModel();
        return ((0, jsx_runtime_1.jsxs)("h1", Object.assign({ className: `${this.getCssBlockName()}__title` }, { children: [ctrl.getTitle(), model.hasRowFormWithDefaultSqlDataSource() &&
                    (ctrl.isChanged() || model.hasNew()) && [
                    ' ',
                    (0, jsx_runtime_1.jsx)("span", Object.assign({ className: `${this.getCssBlockName()}__star` }, { children: "*" }), 'star'),
                ]] })));
    }
    renderSelectButton() {
        const ctrl = this.getCtrl();
        const model = ctrl.getModel();
        return ((0, jsx_runtime_1.jsx)(common_1.Button, Object.assign({ classList: ['toolbar-button', 'default'], onClick: ctrl.onSelectClick, enabled: !!ctrl.getSelectedRowKey() }, { children: (0, jsx_runtime_1.jsx)("div", { children: model.getApp().getText().page.select }) })));
    }
    renderSaveAndCloseButton() {
        const ctrl = this.getCtrl();
        const model = ctrl.getModel();
        return ((0, jsx_runtime_1.jsx)(common_1.Button, Object.assign({ classList: ['toolbar-button', 'default'], onClick: ctrl.onSaveAndCloseClick, enabled: ctrl.isValid() && (model.hasNew() || ctrl.isChanged()) }, { children: (0, jsx_runtime_1.jsx)("div", { children: model.getApp().getText().page.saveAndClose }) })));
    }
    renderCloseButton() {
        const ctrl = this.getCtrl();
        const model = ctrl.getModel();
        return ((0, jsx_runtime_1.jsx)(common_1.Button, Object.assign({ classList: ['toolbar-button'], onClick: ctrl.onClosePageClick }, { children: (0, jsx_runtime_1.jsx)("div", { children: model.getApp().getText().page.close }) })));
    }
    renderActionsDropdownButton() {
        return ((0, jsx_runtime_1.jsx)(common_1.DropdownButton, Object.assign({ classList: ['toolbar-dropdown-button'], actions: this.getActionsForDropdownButton(), onClick: this.onActionsClick }, { children: (0, jsx_runtime_1.jsx)(common_1.MoreVertIcon, {}) })));
    }
    renderToolbar() {
        const ctrl = this.getCtrl();
        const model = ctrl.getModel();
        return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: `${this.getCssBlockName()}__toolbar` }, { children: model.hasActions() && this.renderActionsDropdownButton() })));
    }
    /* shouldComponentUpdate(nextProps, nextState) {
        return false;
    } */
    renderTableForms() {
        const tableForms = this.getTableForms();
        if (tableForms.length === 1) {
            return this.renderForm(tableForms[0]);
        }
        else {
            return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: `${this.getCssBlockName()}__table-forms flex-max frame` }, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "frame__container" }, { children: (0, jsx_runtime_1.jsx)(common_1.Tab2, { tabs: this.getFormTabs(tableForms), classList: ['Tab-blue', 'full'] }) })) })));
        }
    }
    renderOpenPageHeaderButton() {
        const ctrl = this.getCtrl();
        return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: `${this.getCssBlockName()}__open`, onClick: ctrl.onOpenPageClick }, { children: (0, jsx_runtime_1.jsx)(common_1.OpenInNewIcon, {}) }), 'open'));
    }
    renderClosePageHeaderButton() {
        const ctrl = this.getCtrl();
        return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: `${this.getCssBlockName()}__close`, onClick: ctrl.onClosePageClick }, { children: (0, jsx_runtime_1.jsx)(common_1.CloseIcon2, {}) }), 'close'));
    }
    renderHeader() {
        const model = this.getCtrl().getModel();
        return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: `${this.getCssBlockName()}__header` }, { children: [this.renderTitle(), model.isModal() && [
                    ...(model.getKey() ? [this.renderOpenPageHeaderButton()] : []),
                    this.renderClosePageHeaderButton(),
                ]] })));
    }
    renderMain() {
        return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: `${this.getCssBlockName()}__main flex-max frame` }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'frame__container flex-column grid-gap-10' }, { children: [this.isToolbar() && this.renderToolbar(), this.getCtrl().getModel().isFormInTab()
                        ? this.renderForms2()
                        : this.renderForms()] })) })));
    }
    renderForms() {
        const model = this.getCtrl().getModel();
        return [
            ...(model.hasRowForm() ? [this.renderRowForms()] : []),
            ...(model.hasTableForm() ? [this.renderTableForms()] : []),
        ];
    }
    renderForms2() {
        return ((0, jsx_runtime_1.jsx)(common_1.Tab2, { tabs: this.getFormTabs(this.getCtrl().forms.filter((form) => form.isVisible())), classList: ['Tab-blue', 'full'] }));
    }
    renderFooter() {
        const model = this.getCtrl().getModel();
        return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: `${this.getCssBlockName()}__footer` }, { children: [this.renderCloseButton(), model.isModal() &&
                    model.hasRowFormWithDefaultSqlDataSource() &&
                    this.renderSaveAndCloseButton(), model.isSelectMode() && this.renderSelectButton()] })));
    }
    render() {
        console.debug('PageView.render', this.getCtrl().getModel().getFullName());
        return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: `${this.getCssClassNames()} ${this.getCtrl().isModal() ? '' : 'full'} flex-column`, style: this.getStyle(), ref: this.el, tabIndex: 0, onKeyDown: this.getCtrl().onKeyDown }, { children: [this.renderHeader(), this.renderMain(), this.getCtrl().isModal() && this.renderFooter()] })));
    }
    getStyle() {
        if (this.getCtrl().isModal()) {
            return {
                width: 1000,
                height: 750,
            };
        }
    }
    componentDidMount() {
        // console.log('PageView.componentDidMount', this.getCtrl().getModel().getFullName());
        if (this.getCtrl().isAutoFocus() && !this.getCtrl().getModel().getKey()) {
        }
        else {
            this.focus();
        }
    }
    focus() {
        // console.log('PageView.focus', this.getCtrl().getModel().getFullName());
        if (this.getElement()) {
            // console.log('focus', this.getElement());
            this.getElement().focus();
        }
        else {
            console.error(`${this.getCtrl().getModel().getFullName()}: el is null (ref={this.el})`);
        }
    }
}
exports.PageView = PageView;
