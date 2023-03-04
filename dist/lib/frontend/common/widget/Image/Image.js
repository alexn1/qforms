"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Image = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const ReactComponent_1 = require("../../ReactComponent");
require("./Image.less");
class Image extends ReactComponent_1.ReactComponent {
    constructor(props) {
        super(props);
        this.onImgClick = async (e) => {
            console.log('Image.onImgClick');
            if (this.props.onClick) {
                return await this.props.onClick();
            }
            this.setState((prevState) => {
                if (prevState.classList) {
                    return { classList: null };
                }
                else {
                    return { classList: ['Image_full'] };
                }
            });
        };
        this.img = react_1.default.createRef();
        this.state = { classList: null };
    }
    getNaturalSize() {
        return [this.img.current.naturalWidth, this.img.current.naturalHeight];
    }
    render() {
        return ((0, jsx_runtime_1.jsx)("img", { className: this.getCssClassNames(), ref: this.img, src: this.props.src, onClick: this.onImgClick }));
    }
}
exports.Image = Image;
if (typeof window === 'object') {
    // @ts-ignore
    window.Image = Image;
}
