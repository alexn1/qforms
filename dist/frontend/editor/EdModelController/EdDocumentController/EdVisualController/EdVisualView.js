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
exports.EdVisualView = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const EdDocumentView_1 = require("../EdDocumentView");
const common_1 = require("../../../../common");
require("./EdVisualView.less");
class EdVisualView extends EdDocumentView_1.EdDocumentView {
    constructor(props) {
        super(props);
        this.onControllerSave = async (e) => {
            const ctrl = this.props.ctrl;
            await ctrl.onControllerSave(this.cm.getValue());
        };
        this.onChange = async (instance, changeObj) => {
            // console.log('VisualView.onChange', this.isChanged());
            await this.rerender();
        };
        this.textarea = React.createRef();
        this.cm = null;
    }
    getTextarea() {
        if (this.textarea)
            return this.textarea.current;
        return null;
    }
    componentDidMount() {
        // console.log('VisualView.componentDidMount', this.getTextarea());
        const ctrl = this.props.ctrl;
        if (ctrl.data.js) {
            this.cm = EdDocumentView_1.EdDocumentView.createCM(this.getTextarea(), ctrl.data.js);
            this.cm.on('change', this.onChange);
        }
    }
    componentDidUpdate() {
        // console.log('componentDidUpdate', this.getTextarea());
        const ctrl = this.props.ctrl;
        const textarea = this.getTextarea();
        if (textarea && ctrl.data.js && !this.cm) {
            this.cm = EdDocumentView_1.EdDocumentView.createCM(this.getTextarea(), ctrl.data.js);
        }
    }
    componentWillUnmount() {
        // console.log('VisualView.componentWillUnmount');
        if (this.cm) {
            this.cm.off('change', this.onChange);
        }
    }
    isChanged() {
        if (!this.cm) {
            return false;
        }
        return this.props.ctrl.data.js !== this.cm.getValue();
    }
    render() {
        const ctrl = this.props.ctrl;
        return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'EdVisualView full' }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "full flex-column" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "toolbar" }, { children: [(0, jsx_runtime_1.jsx)(common_1.Button, Object.assign({ onClick: ctrl.onCreateModelBack }, { children: "Model.back.js" })), !ctrl.data.js && ((0, jsx_runtime_1.jsx)(common_1.Button, Object.assign({ onClick: ctrl.onCreateCustomController }, { children: "Controller.front.js" }))), !ctrl.data.jsx && ((0, jsx_runtime_1.jsx)(common_1.Button, Object.assign({ onClick: ctrl.onCreateCustomView }, { children: "View.jsx" }))), !ctrl.data.less && ((0, jsx_runtime_1.jsx)(common_1.Button, Object.assign({ onClick: ctrl.onCreateCustomStyle }, { children: "View.less" }))), ctrl.data.js && ((0, jsx_runtime_1.jsx)(common_1.Button, Object.assign({ onClick: this.onControllerSave, enabled: this.isChanged() }, { children: "Save" })))] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'edit flex-max full' }, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'cm-container full' }, { children: ctrl.data.js && (0, jsx_runtime_1.jsx)("textarea", { ref: this.textarea }) })) }))] })) })));
    }
}
exports.EdVisualView = EdVisualView;
