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
exports.EdSqlDataSourceView = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const EdDocumentView_1 = require("../EdDocumentView");
const common_1 = require("../../../../common");
require("./EdSqlDataSourceView.less");
class EdSqlDataSourceView extends EdDocumentView_1.EdDocumentView {
    constructor(props) {
        super(props);
        this.onChange = async (i, o) => {
            // console.debug('SqlDataSourceView.onChange');
            await this.rerender();
        };
        this.onSaveClick = async (e) => {
            console.debug('SqlDataSourceView.onSaveClick');
            const ctrl = this.props.ctrl;
            await ctrl.onSaveClick(this.state.selected, this[this.state.selected].getValue());
            await this.rerender();
        };
        this.singleRef = React.createRef();
        this.multipleRef = React.createRef();
        this.countRef = React.createRef();
        this.state = {
            selected: 'singleQuery',
        };
        this.singleQuery = null;
        this.multipleQuery = null;
        this.countQuery = null;
    }
    componentDidMount() {
        const { ctrl } = this.props;
        this.singleQuery = EdDocumentView_1.EdDocumentView.createCM(this.singleRef.current, ctrl.model.getAttr('singleQuery'));
        this.multipleQuery = EdDocumentView_1.EdDocumentView.createCM(this.multipleRef.current, ctrl.model.getAttr('multipleQuery'));
        this.countQuery = EdDocumentView_1.EdDocumentView.createCM(this.countRef.current, ctrl.model.getAttr('countQuery'));
        this.singleQuery.on('change', this.onChange);
        this.multipleQuery.on('change', this.onChange);
        this.countQuery.on('change', this.onChange);
    }
    componentWillUnmount() {
        this.singleQuery.off('change', this.onChange);
        this.multipleQuery.off('change', this.onChange);
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
        return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'EdSqlDataSourceView full flex-column' }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "toolbar" }, { children: [(0, jsx_runtime_1.jsx)(common_1.Button, Object.assign({ onClick: this.onSaveClick, enabled: this.isChanged() }, { children: "Save" })), (0, jsx_runtime_1.jsx)(common_1.Button, Object.assign({ onClick: ctrl.onCreateModelBack }, { children: "Model.back.js" })), "\u00A0", (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "btn-group", role: "group" }, { children: [(0, jsx_runtime_1.jsx)("button", Object.assign({ className: `${this.getButtonClass('singleQuery')}`, style: {
                                        fontWeight: this.isSelected('singleQuery') ? 'bold' : undefined,
                                    }, onClick: (e) => this.setState({ selected: 'singleQuery' }) }, { children: "singleQuery" })), (0, jsx_runtime_1.jsx)("button", Object.assign({ className: `${this.getButtonClass('multipleQuery')}`, style: {
                                        fontWeight: this.isSelected('multipleQuery') ? 'bold' : undefined,
                                    }, onClick: (e) => this.setState({ selected: 'multipleQuery' }) }, { children: "multipleQuery" })), (0, jsx_runtime_1.jsx)("button", Object.assign({ className: `${this.getButtonClass('countQuery')}`, style: {
                                        fontWeight: this.isSelected('countQuery') ? 'bold' : undefined,
                                    }, onClick: (e) => this.setState({ selected: 'countQuery' }) }, { children: "countQuery" }))] }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "edit flex-max full" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "cm-container full", style: { visibility: this.getVisibility('singleQuery') } }, { children: (0, jsx_runtime_1.jsx)("textarea", { ref: this.singleRef }) })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "cm-container full", style: { visibility: this.getVisibility('multipleQuery') } }, { children: (0, jsx_runtime_1.jsx)("textarea", { ref: this.multipleRef }) })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "cm-container full", style: { visibility: this.getVisibility('countQuery') } }, { children: (0, jsx_runtime_1.jsx)("textarea", { ref: this.countRef }) }))] }))] })));
    }
}
exports.EdSqlDataSourceView = EdSqlDataSourceView;
