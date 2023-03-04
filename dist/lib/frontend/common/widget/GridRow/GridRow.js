"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GridRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const ReactComponent_1 = require("../../ReactComponent");
class GridRow extends ReactComponent_1.ReactComponent {
    isCellActive(j) {
        return this.props.active && this.props.activeColumn === j;
    }
    shouldComponentUpdate(nextProps, nextState) {
        // console.log('GridRow.shouldComponentUpdate', nextProps.updated - this.props.updated, nextProps.resized - this.props.resized);
        if (this.props.updated) {
            if (nextProps.updated - this.props.updated)
                return true;
            if (nextProps.resized - this.props.resized)
                return true;
            if (this.props.active !== nextProps.active)
                return true;
            if (this.props.active && this.props.activeColumn !== nextProps.activeColumn)
                return true;
            return false;
        }
        return true;
    }
    render() {
        // console.log('GridRow.render', this.props.i);
        const grid = this.props.grid;
        const row = this.props.row;
        const i = this.props.i;
        const key = this.props.rowKey;
        const link = grid.props.createLinkCallback ? grid.props.createLinkCallback(key) : null;
        return ((0, jsx_runtime_1.jsxs)("a", Object.assign({ className: `${grid.getCssBlockName()}__tr ${this.props.active ? 'active' : ''}`, "data-key": key, href: link, onClick: grid.onLinkClick }, { children: [grid.props.columns.map((column, j) => ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: `${grid.getCssBlockName()}__td ${this.isCellActive(j) ? 'active' : ''}`, style: { width: grid.getColumnWidth(j) }, "data-rc": `[${i},${j}]`, "data-row": key, onMouseDown: grid.onCellMouseDown, onDoubleClick: grid.onCellDoubleClick }, { children: grid.renderCell(row, column) }), column.name))), !!grid.props.extraColumn && ((0, jsx_runtime_1.jsx)("div", { className: `${grid.getCssBlockName()}__td`, "data-r": i, "data-row": key, onMouseDown: grid.onRowMouseDown, onDoubleClick: grid.onRowDoubleClick }))] })));
    }
}
exports.GridRow = GridRow;
// @ts-ignore
window.GridRow = GridRow;
