"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RowFormComboBoxFieldView = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const RowFormFieldView_1 = require("../RowFormFieldView");
const common_1 = require("../../../../../../common");
require("./RowFormComboBoxFieldView.less");
class RowFormComboBoxFieldView extends RowFormFieldView_1.RowFormFieldView {
    constructor() {
        super(...arguments);
        this.onChange = async (widgetValue) => {
            // console.debug('RowFormComboBoxFieldView.onChange', widgetValue);
            this.rerender();
            await this.getCtrl().onChange(widgetValue);
        };
    }
    isCreateButtonVisible() {
        if (this.getCtrl().getForm().getMode() !== 'edit') {
            return false;
        }
        if (this.getCtrl().getModel().getAttr('newRowMode') === 'disabled') {
            return false;
        }
        if (this.getCtrl().getModel().getAttr('newRowMode') === 'editPage') {
            return (!!this.getCtrl().getModel().getAttr('itemEditPage') &&
                !!this.getCtrl().getModel().getAttr('itemCreateForm'));
        }
        if (this.getCtrl().getModel().getAttr('newRowMode') === 'createPage') {
            return (!!this.getCtrl().getModel().getAttr('itemCreatePage') &&
                !!this.getCtrl().getModel().getAttr('itemCreateForm'));
        }
    }
    renderSelect() {
        const ctrl = this.getCtrl();
        return ((0, jsx_runtime_1.jsx)(common_1.Select, { classList: [`${this.getCssBlockName()}__select`], onCreate: this.onWidgetCreate, 
            // nullable={ctrl.getModel().isNullable()}
            value: ctrl.getValueForWidget(), readOnly: !ctrl.isEditable(), onChange: this.onChange, items: ctrl.getItems(), placeholder: ctrl.getPlaceholder(), onMouseDown: ctrl.getModel().getAttr('itemSelectPage') ? ctrl.onItemSelect : null }));
    }
    renderEditButton() {
        const ctrl = this.getCtrl();
        return ((0, jsx_runtime_1.jsx)(common_1.Button, Object.assign({ classList: [`${this.getCssBlockName()}__edit-button`], onClick: ctrl.onEditButtonClick, enabled: !!ctrl.getValue() }, { children: "..." })));
    }
    renderCreateButton() {
        const ctrl = this.getCtrl();
        return ((0, jsx_runtime_1.jsx)(common_1.Button, Object.assign({ classList: [`${this.getCssBlockName()}__create-button`], onClick: ctrl.onCreateButtonClick }, { children: "+" })));
    }
    render() {
        // console.debug('RowFormComboBoxFieldView.render', this.getCtrl().getItems(), this.getCtrl().getValue());
        return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: this.getCssClassNames() }, { children: [this.renderSelect(), this.getCtrl().getModel().getAttr('itemEditPage') &&
                    !!this.getCtrl().getValue() &&
                    this.renderEditButton(), this.isCreateButtonVisible() && this.renderCreateButton()] })));
    }
}
exports.RowFormComboBoxFieldView = RowFormComboBoxFieldView;
