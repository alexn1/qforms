"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RowFormView = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const FormView_1 = require("../FormView");
const common_1 = require("../../../../../common");
require("./RowFormView.less");
class RowFormView extends FormView_1.FormView {
    renderToolbar() {
        // console.log('RowFormView.renderToolbar');
        const { ctrl } = this.props;
        const text = ctrl.getModel().getApp().getText();
        return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: `${this.getCssBlockName()}__toolbar flex grid-gap-5` }, { children: [ctrl.model.hasDefaultPersistentDataSource() && ((0, jsx_runtime_1.jsx)(common_1.Button, Object.assign({ classList: ['toolbar-button'], onClick: ctrl.onEditClick, visible: ctrl.getMode() === 'view' }, { children: (0, jsx_runtime_1.jsx)("div", { children: text.form.edit }) }), "edit")), ctrl.model.hasDefaultPersistentDataSource() && ((0, jsx_runtime_1.jsx)(common_1.Button, Object.assign({ classList: ['toolbar-button'], enabled: (ctrl.state.changed || ctrl.state.hasNew) && ctrl.state.valid, onClick: ctrl.onSaveClick, visible: ctrl.getMode() === 'edit' }, { children: (0, jsx_runtime_1.jsx)("div", { children: text.form.save }) }), "save")), ctrl.model.hasDefaultPersistentDataSource() && ctrl.model.getKey() && ((0, jsx_runtime_1.jsx)(common_1.Button, Object.assign({ classList: ['toolbar-button'], visible: ctrl.getMode() === 'edit' && !ctrl.state.changed && ctrl.state.valid, onClick: ctrl.onCancelClick }, { children: (0, jsx_runtime_1.jsx)("div", { children: text.form.cancel }) }), "cancel")), ctrl.model.hasDefaultPersistentDataSource() && ctrl.model.getKey() && ((0, jsx_runtime_1.jsx)(common_1.Button, Object.assign({ classList: ['toolbar-button'], enabled: ctrl.state.changed || !ctrl.isValid(), onClick: ctrl.onDiscardClick, visible: ctrl.getMode() === 'edit' && (ctrl.state.changed || !ctrl.state.valid) }, { children: (0, jsx_runtime_1.jsx)("div", { children: text.form.discard }) }), "discard")), ctrl.model.hasDefaultPersistentDataSource() &&
                    ctrl.getModel().getAttr('refreshButton') === 'true' && ((0, jsx_runtime_1.jsx)(common_1.Button, Object.assign({ classList: ['toolbar-button'], enabled: !ctrl.state.changed && !ctrl.state.hasNew, onClick: ctrl.onRefreshClick, visible: ctrl.getMode() === 'view' }, { children: (0, jsx_runtime_1.jsx)("div", { children: text.form.refresh }) }), "refresh")), this.isActionsVisible() && ctrl.model.hasActions() && ((0, jsx_runtime_1.jsx)(common_1.DropdownButton, Object.assign({ classList: ['toolbar-dropdown-button'], actions: this.getActionsForDropdownButton(), onClick: this.onActionsClick, enabled: this.isActionsEnabled() }, { children: (0, jsx_runtime_1.jsx)(common_1.MoreVertIcon, {}) })))] })));
    }
    isActionsEnabled() {
        // return this.getCtrl().state.mode === 'view';
        return true;
    }
    isActionsVisible() {
        if (this.getCtrl().getModel().hasDefaultPersistentDataSource()) {
            return !!this.getCtrl().getModel().getKey();
        }
        return true;
    }
    renderLabel(fieldCtrl) {
        const model = fieldCtrl.getModel();
        const name = model.getName();
        return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: `${this.getCssBlockName()}__label` }, { children: [model.getCaption(), ":", model.isNotNull() && (0, jsx_runtime_1.jsx)("span", Object.assign({ style: { color: 'red' } }, { children: "*" }))] }), `label.${name}`));
    }
    renderField(fieldCtrl) {
        // console.log('RowFormView.renderField', fieldCtrl.model.getClassName());
        const name = fieldCtrl.getModel().getName();
        return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: `${this.getCssBlockName()}__field` }, { children: this.renderFieldView(fieldCtrl) }), `field.${name}`));
    }
    renderFieldView(fieldCtrl) {
        return RowFormView.renderFieldView(fieldCtrl);
    }
    static renderFieldView(fieldCtrl) {
        /*return React.createElement(fieldCtrl.getViewClass(), {
            onCreate: fieldCtrl.onViewCreate,
            ctrl: fieldCtrl,
        });*/
        return fieldCtrl.renderView();
    }
    renderError(fieldCtrl) {
        // console.log('RowFormView.renderError:', fieldCtrl.state);
        const name = fieldCtrl.getModel().getName();
        return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: `${this.getCssBlockName()}__error` }, { children: (0, jsx_runtime_1.jsx)(common_1.Tooltip, { position: "left", type: "alert", hidden: fieldCtrl.getErrorMessage() === null, tip: fieldCtrl.getErrorMessage() }) }), `tooltip.${name}`));
    }
    renderGroup(fieldCtrl) {
        /*return (
            <>
                {this.renderLabel(fieldCtrl)}
                {this.renderField(fieldCtrl)}
                {this.renderError(fieldCtrl)}
            </>
        );*/
        return [
            this.renderLabel(fieldCtrl),
            this.renderField(fieldCtrl),
            this.renderError(fieldCtrl),
        ];
        /*return <div key={fieldCtrl.getModel().getName()} className={`${this.getCssClassNames()}__group`}>
            {this.renderLabel(fieldCtrl)}
            {this.renderField(fieldCtrl)}
            {this.renderError(fieldCtrl)}
        </div>;*/
    }
    renderGroups() {
        // console.log('RowFormView.renderGroups');
        const ctrl = this.getCtrl();
        return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: `${this.getCssBlockName()}__groups` }, { children: Object.keys(ctrl.fields)
                .filter((name) => ctrl.getField(name).isVisible())
                .map((name) => {
                return this.renderGroup(ctrl.getField(name));
            }) })));
    }
    render() {
        console.log('RowFormView.render', this.getCtrl().getModel().getFullName());
        return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: `${this.getCssClassNames()} flex-column grid-gap-5`, style: this.getStyle() }, { children: [(this.getCtrl().getModel().hasDefaultPersistentDataSource() ||
                    this.getCtrl().getModel().hasActions()) &&
                    this.renderToolbar(), this.renderGroups()] })));
    }
}
exports.RowFormView = RowFormView;
