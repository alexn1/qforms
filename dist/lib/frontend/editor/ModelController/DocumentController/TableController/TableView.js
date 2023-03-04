"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableView = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const common_1 = require("../../../../common");
require("./TableView.less");
class TableView extends common_1.ReactComponent {
    renderRows() {
        const ctrl = this.props.ctrl;
        return ctrl.columns.map((column) => ((0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("td", { children: column.model.getAttr('name') }), (0, jsx_runtime_1.jsx)("td", { children: column.model.getAttr('caption') }), (0, jsx_runtime_1.jsx)("td", { children: column.model.getAttr('type') }), (0, jsx_runtime_1.jsx)("td", { children: column.model.getAttr('key') }), (0, jsx_runtime_1.jsx)("td", { children: column.model.getAttr('auto') }), (0, jsx_runtime_1.jsx)("td", { children: column.model.getAttr('nullable') })] }, column.model.getName())));
    }
    render() {
        const ctrl = this.props.ctrl;
        return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: this.getCssClassNames() }, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "client frame" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "frame__container flex-column" }, { children: [(0, jsx_runtime_1.jsx)(common_1.Grid, { classList: ['flex-max'], columns: [
                                { name: 'name', title: 'name', width: 100 },
                                { name: 'caption', title: 'caption', width: 100 },
                                { name: 'type', title: 'type', width: 60 },
                                { name: 'key', title: 'key', width: 60 },
                                { name: 'auto', title: 'auto', width: 60 },
                                { name: 'nullable', title: 'nullable', width: 60 },
                            ], rows: ctrl.columns.map((column) => column.model.getAttributes()), getRowKey: (row) => row.name }), (0, jsx_runtime_1.jsx)(common_1.Button, Object.assign({ onClick: ctrl.onCreateFormButtonClick }, { children: "Create Form" }))] })) })) })));
    }
}
exports.TableView = TableView;
