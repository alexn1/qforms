"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexView = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const common_1 = require("../../common");
require("./IndexView.less");
class IndexView extends common_1.ReactComponent {
    renderModals() {
        const { ctrl } = this.props;
        return ((0, jsx_runtime_1.jsx)("div", { children: ctrl.modals.map((modal) => ((0, jsx_runtime_1.jsx)(common_1.Modal, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "modal-dialog modal-sm" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "modal-content" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "modal-header" }, { children: [(0, jsx_runtime_1.jsx)(common_1.Button, Object.assign({ classList: ['close'], onClick: ctrl.closeModal }, { children: (0, jsx_runtime_1.jsx)("span", { children: "\u00D7" }) })), (0, jsx_runtime_1.jsx)("h4", Object.assign({ className: "modal-title" }, { children: "New Application" }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "modal-body" }, { children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: "folderName" }, { children: "Folder Name" })), (0, jsx_runtime_1.jsx)(common_1.TextBox, { id: "folderName", onCreate: ctrl.onFolderNameCreate, onChange: ctrl.onFolderNameChange })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: "appName" }, { children: "Application Name" })), (0, jsx_runtime_1.jsx)(common_1.TextBox, { id: "appName", onChange: ctrl.onAppNameChange })] })] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "modal-footer" }, { children: [(0, jsx_runtime_1.jsx)(common_1.Button, Object.assign({ name: "create", classList: ['btn', 'btn-primary'], onClick: ctrl.onCreateClick }, { children: "Create" })), (0, jsx_runtime_1.jsx)(common_1.Button, Object.assign({ classList: ['btn', 'btn-default'], onClick: ctrl.closeModal }, { children: "Close" }))] }))] })) })) }, modal.id.toString()))) }));
    }
    render() {
        console.log('IndexView.render');
        const { ctrl } = this.props;
        return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "IndexView" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "container", style: { backgroundColor: '#eee' } }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "row", style: { margin: '50px 0' } }, { children: [(0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(common_1.ComboBox, { value: ctrl.currentAppFullName, items: ctrl.getAppItems(), size: 15, style: { width: '100%' }, onDoubleClick: ctrl.run, onChange: ctrl.onAppChange }) }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(common_1.ComboBox, { value: ctrl.currentAppEnv, items: ctrl.getEnvItems(), onChange: ctrl.onEnvChange }) }), (0, jsx_runtime_1.jsx)(common_1.Button, Object.assign({ classList: ['btn', 'btn-primary', 'btn-block'], onClick: ctrl.run }, { children: "Run" })), ctrl.data.nodeEnv === 'development' && ((0, jsx_runtime_1.jsx)(common_1.Button, Object.assign({ classList: ['btn', 'btn-default', 'btn-block'], onClick: ctrl.edit }, { children: "Edit" }))), ctrl.data.nodeEnv === 'development' && ((0, jsx_runtime_1.jsx)(common_1.Button, Object.assign({ classList: ['btn', 'btn-default', 'btn-block'], onClick: ctrl.btnCreate_Click }, { children: "New..." })))] })] })) })), this.renderModals()] })));
    }
}
exports.IndexView = IndexView;