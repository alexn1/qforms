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
exports.NoSqlDataSourceView = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const DocumentView_1 = require("../DocumentView");
const common_1 = require("../../../../common");
require("./NoSqlDataSourceView.less");
class NoSqlDataSourceView extends DocumentView_1.DocumentView {
    constructor(props) {
        super(props);
        this.onChange = async (i, o) => {
            // console.log('NoSqlDataSourceView.onChange');
            await this.rerender();
        };
        this.onSaveClick = async (e) => {
            console.log('NoSqlDataSourceView.onSaveClick');
            const ctrl = this.props.ctrl;
            await ctrl.onSaveClick(this.state.selected, this[this.state.selected].getValue());
            await this.rerender();
        };
        this.selectRef = React.createRef();
        this.countRef = React.createRef();
        this.state = {
            selected: 'selectQuery',
        };
        this.selectQuery = null;
        this.countQuery = null;
    }
    componentDidMount() {
        const { ctrl } = this.props;
        this.selectQuery = DocumentView_1.DocumentView.createCM(this.selectRef.current, ctrl.model.getAttr('selectQuery'));
        this.countQuery = DocumentView_1.DocumentView.createCM(this.countRef.current, ctrl.model.getAttr('countQuery'));
        this.selectQuery.on('change', this.onChange);
        this.countQuery.on('change', this.onChange);
    }
    componentWillUnmount() {
        this.selectQuery.off('change', this.onChange);
        this.countQuery.off('change', this.onChange);
    }
    isChanged() {
        const { ctrl } = this.props;
        const cm = this[this.state.selected];
        if (!cm)
            return false;
        return cm.getValue() !== ctrl.model.getAttr(this.state.selected);
    }
    getButtonClass(name) {
        return this.state.selected === name ? 'btn-primary' : 'btn-default';
    }
    getVisibility(name) {
        return this.state.selected === name ? 'visible' : 'hidden';
    }
    isSelected(name) {
        return this.state.selected === name;
    }
    render() {
        const { ctrl } = this.props;
        return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'NoSqlDataSourceView full flex-column' }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "toolbar" }, { children: [(0, jsx_runtime_1.jsx)(common_1.Button, Object.assign({ onClick: this.onSaveClick, enabled: this.isChanged() }, { children: "Save" })), (0, jsx_runtime_1.jsx)(common_1.Button, Object.assign({ onClick: ctrl.onCreateModelBack }, { children: "Model.back.js" })), "\u00A0", (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "btn-group", role: "group" }, { children: [(0, jsx_runtime_1.jsx)("button", Object.assign({ className: `${this.getButtonClass('selectQuery')}`, style: { fontWeight: this.isSelected('selectQuery') ? 'bold' : null }, onClick: (e) => this.setState({ selected: 'selectQuery' }) }, { children: "selectQuery" })), (0, jsx_runtime_1.jsx)("button", Object.assign({ className: `${this.getButtonClass('countQuery')}`, style: { fontWeight: this.isSelected('countQuery') ? 'bold' : null }, onClick: (e) => this.setState({ selected: 'countQuery' }) }, { children: "countQuery" }))] }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "edit flex-max full" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "cm-container full", style: { visibility: this.getVisibility('selectQuery') } }, { children: (0, jsx_runtime_1.jsx)("textarea", { ref: this.selectRef }) })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "cm-container full", style: { visibility: this.getVisibility('countQuery') } }, { children: (0, jsx_runtime_1.jsx)("textarea", { ref: this.countRef }) }))] }))] })));
    }
}
exports.NoSqlDataSourceView = NoSqlDataSourceView;
