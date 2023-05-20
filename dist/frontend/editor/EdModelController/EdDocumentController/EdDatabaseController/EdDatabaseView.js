"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EdDatabaseView = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const common_1 = require("../../../../common");
const TreeWidget_1 = require("../../../TreeWidget/TreeWidget");
require("./EdDatabaseView.less");
class EdDatabaseView extends common_1.ReactComponent {
    renderGrid() {
        // console.log('DatabaseView.renderGrid');
        const ctrl = this.props.ctrl;
        return ((0, jsx_runtime_1.jsx)(common_1.Grid, { classList: ['flex-max'], columns: [
                { name: 'name', title: 'name', width: 100 },
                { name: 'type', title: 'type', width: 60 },
                { name: 'key', title: 'key', width: 60 },
                { name: 'auto', title: 'auto', width: 60 },
                { name: 'nullable', title: 'nullable', width: 60 },
                { name: 'dbType', title: 'dbType', width: 200 },
                { name: 'comment', title: 'comment', width: 100 },
            ], rows: ctrl.tableInfo, getRowKey: (row) => row.name }));
    }
    render() {
        // console.log('DatabaseView.render');
        const ctrl = this.props.ctrl;
        const document = this.props.document;
        return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'EdDatabaseView frame' }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'client frame' }, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'frame__container' }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'divTableInfo full flex-column' }, { children: [ctrl.tableInfo && this.renderGrid(), ctrl.tableInfo && ((0, jsx_runtime_1.jsx)(common_1.Button, Object.assign({ onClick: ctrl.onCreateTableClick }, { children: "Create Table" })))] })) })) })), (0, jsx_runtime_1.jsx)(TreeWidget_1.TreeWidget, { classList: ['sidebar'], items: document.treeWidgetItems, onItemSelect: ctrl.onTableSelect2 })] })));
    }
}
exports.EdDatabaseView = EdDatabaseView;
