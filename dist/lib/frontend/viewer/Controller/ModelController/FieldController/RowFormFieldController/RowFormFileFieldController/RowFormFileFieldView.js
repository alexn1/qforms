"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RowFormFileFieldView = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const RowFormFieldView_1 = require("../RowFormFieldView");
const common_1 = require("../../../../../../common");
const ImageDialogController_1 = require("../../../../ModalController/ImageDialogController/ImageDialogController");
require("./RowFormFileFieldView.less");
class RowFormFileFieldView extends RowFormFieldView_1.RowFormFieldView {
    constructor(props) {
        super(props);
        this.onClearClick = (e) => {
            this.props.ctrl.onChange('');
        };
        this.onChange = async (e) => {
            const file = e.target.files[0];
            if (file) {
                const widgetValue = await common_1.Helper.readFileAsDataURL(file);
                // console.log('widgetValue:', widgetValue);
                this.props.ctrl.onChange(widgetValue);
            }
        };
        this.onImageClick = async (e) => {
            console.log('RowFormFileFieldView.onImageClick');
            const ctrl = this.props.ctrl;
            const app = ctrl.getApp();
            const src = ctrl.getValueForWidget();
            const imageDialogCtrl = new ImageDialogController_1.ImageDialogController({
                app,
                id: app.getNewId(),
                src,
                onClose: () => {
                    console.log('onClose');
                    this.getCtrl().getPage().getView().getElement().focus();
                },
            });
            await app.openModal(imageDialogCtrl);
        };
        this.onImageIconClick = async (e) => {
            console.log('RowFormFileFieldView.onImageIconClick');
            this.getInput().click();
        };
        this.image = react_1.default.createRef();
        this.div = react_1.default.createRef();
        this.input = react_1.default.createRef();
    }
    getImage() {
        return this.image.current;
    }
    getDiv() {
        return this.div.current;
    }
    getInput() {
        return this.input.current;
    }
    updateSize() {
        if (this.getImage()) {
            const ns = this.getImage().getNaturalSize();
            this.getDiv().innerText = `${ns[0]}×${ns[1]}`;
        }
    }
    render() {
        const ctrl = this.getCtrl();
        const row = ctrl.getRow();
        const value = ctrl.getValueForWidget();
        return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: this.getCssClassNames(), style: this.getStyle(row) }, { children: [!!value ? ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: `${this.getCssBlockName()}__image-block` }, { children: [(0, jsx_runtime_1.jsx)(common_1.Image, { classList: [`${this.getCssBlockName()}__image`], ref: this.image, src: value, onClick: this.onImageClick }), (0, jsx_runtime_1.jsx)("span", { className: `${this.getCssBlockName()}__size`, ref: this.div }), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: `${this.getCssBlockName()}__length` }, { children: common_1.Helper.formatNumber(value.length) }))] }))) : ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: `${this.getCssBlockName()}__image-icon`, onClick: this.onImageIconClick }, { children: (0, jsx_runtime_1.jsx)("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", width: 48 * 2, height: 48 * 2, viewBox: "0 0 48 48" }, { children: (0, jsx_runtime_1.jsx)("path", { d: "M38.65 15.3V11h-4.3V8h4.3V3.65h3V8H46v3h-4.35v4.3ZM4.7 44q-1.2 0-2.1-.9-.9-.9-.9-2.1V15.35q0-1.15.9-2.075.9-.925 2.1-.925h7.35L15.7 8h14v3H17.1l-3.65 4.35H4.7V41h34V20h3v21q0 1.2-.925 2.1-.925.9-2.075.9Zm17-7.3q3.6 0 6.05-2.45 2.45-2.45 2.45-6.1 0-3.6-2.45-6.025Q25.3 19.7 21.7 19.7q-3.65 0-6.075 2.425Q13.2 24.55 13.2 28.15q0 3.65 2.425 6.1Q18.05 36.7 21.7 36.7Zm0-3q-2.4 0-3.95-1.575-1.55-1.575-1.55-3.975 0-2.35 1.55-3.9 1.55-1.55 3.95-1.55 2.35 0 3.925 1.55 1.575 1.55 1.575 3.9 0 2.4-1.575 3.975Q24.05 33.7 21.7 33.7Zm0-5.5Z" }) })) }))), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: `${this.getCssBlockName()}__toolbar` }, { children: [(0, jsx_runtime_1.jsx)("input", { ref: this.input, type: "file", onChange: this.onChange, disabled: !ctrl.isEditable(), style: { display: !value ? 'none' : null } }), !!value && ((0, jsx_runtime_1.jsx)(common_1.Button, Object.assign({ onClick: this.onClearClick, enabled: ctrl.isEditable() }, { children: this.getCtrl().getApp().getModel().getText().field.clear })))] }))] })));
    }
    componentDidMount() {
        // console.log('RowFormFileFieldView.componentDidMount', this.props.ctrl.model.getFullName());
        setTimeout(() => this.updateSize(), 0);
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        // console.log('RowFormFileFieldView.componentDidUpdate', this.props.ctrl.model.getFullName(), snapshot);
        setTimeout(() => this.updateSize(), 0);
    }
}
exports.RowFormFileFieldView = RowFormFileFieldView;
if (typeof window === 'object') {
    // @ts-ignore
    window.RowFormFileFieldView = RowFormFileFieldView;
}
