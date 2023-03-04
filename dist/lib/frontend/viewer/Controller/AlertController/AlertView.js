"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertView = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const View_1 = require("../View");
const common_1 = require("../../../common");
require("./AlertView.less");
class AlertView extends View_1.View {
    constructor(props) {
        super(props);
        this.el = react_1.default.createRef();
    }
    getHeaderStyle() {
        return this.getCtrl().options.titleStyle /* || {color: 'red'}*/;
    }
    render() {
        return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: this.getCssClassNames(), ref: this.el, tabIndex: 0, onKeyDown: this.getCtrl().onKeyDown }, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ className: `${this.getCssBlockName()}__container` }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: `${this.getCssBlockName()}__content flex-column` }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: `${this.getCssBlockName()}__header` }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: `${this.getCssBlockName()}__title`, style: this.getHeaderStyle() }, { children: this.getCtrl().options.title || 'Alert' })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: `${this.getCssBlockName()}__close`, onClick: this.getCtrl().onCloseClick }, { children: (0, jsx_runtime_1.jsx)(common_1.CloseIcon2, {}) }))] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: `${this.getCssBlockName()}__main flex-max` }, { children: this.getCtrl().options.message })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: `${this.getCssBlockName()}__footer` }, { children: (0, jsx_runtime_1.jsx)(common_1.Button, { classList: [`${this.getCssBlockName()}__ok-button`], title: 'OK', onClick: this.getCtrl().onOkButtonClick }) }))] })) })) })));
    }
    componentDidMount() {
        this.getElement().focus();
    }
}
exports.AlertView = AlertView;
