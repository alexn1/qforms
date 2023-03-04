"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageDialogView = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const View_1 = require("../../View");
const common_1 = require("../../../../common");
require("./ImageDialogView.less");
class ImageDialogView extends View_1.View {
    constructor(props) {
        super(props);
        this.el = react_1.default.createRef();
    }
    render() {
        console.log('ImageDialogView.render');
        const { ctrl } = this.props;
        return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: this.getCssClassNames(), ref: this.el, tabIndex: 0, onKeyDown: this.getCtrl().onKeyDown }, { children: [(0, jsx_runtime_1.jsx)("img", { className: `${this.getCssBlockName()}__image`, src: ctrl.getSrc(), onClick: ctrl.onImageClick }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: `${this.getCssBlockName()}__close`, onClick: ctrl.onCloseClick }, { children: (0, jsx_runtime_1.jsx)(common_1.CloseIcon2, {}) }))] })));
    }
    componentDidMount() {
        this.getElement().focus();
    }
}
exports.ImageDialogView = ImageDialogView;
