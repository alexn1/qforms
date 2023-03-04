"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GridCell = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const ReactComponent_1 = require("../../ReactComponent");
const Helper_1 = require("../../Helper");
class GridCell extends ReactComponent_1.ReactComponent {
    constructor(props) {
        super(props);
        this.span = React.createRef();
    }
    getSpanOffsetWidth() {
        if (!this.span.current)
            return 0;
        return this.span.current.offsetWidth;
    }
    renderCellValue(rawValue) {
        const value = this.props.grid.props.decodeValue ? Helper_1.Helper.decodeValue(rawValue) : rawValue;
        if (typeof value === 'boolean')
            return value.toString();
        return value;
    }
    render() {
        const row = this.props.row;
        const column = this.props.column;
        return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: `${this.getCssClassNames()} ellipsis` }, { children: (0, jsx_runtime_1.jsx)("span", Object.assign({ ref: this.span }, { children: this.renderCellValue(row[column.name]) })) })));
    }
}
exports.GridCell = GridCell;
// @ts-ignore
window.GridCell = GridCell;
