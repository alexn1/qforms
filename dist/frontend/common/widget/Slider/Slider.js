"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Slider = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const ReactComponent_1 = require("../../ReactComponent");
const LeftIcon_1 = require("../../icon/LeftIcon");
const RightIcon_1 = require("../../icon/RightIcon");
const CloseIcon2_1 = require("../../icon/CloseIcon2");
require("./Slider.less");
class Slider extends ReactComponent_1.ReactComponent {
    constructor(props) {
        super(props);
        this.onPrevClick = (e) => {
            // console.debug('Slider.onPrevClick');
            this.setState((prevState) => {
                let image = prevState.image - 1;
                if (image < 0) {
                    image = this.props.images.length - 1;
                }
                return { image };
            });
        };
        this.onNextClick = (e) => {
            // console.debug('Slider.onNextClick');
            this.setState((prevState) => {
                let image = prevState.image + 1;
                if (image > this.props.images.length - 1) {
                    image = 0;
                }
                return { image };
            });
        };
        this.onImageClick = (e) => {
            console.debug('Slider.onImageClick');
            if (this.state.classList) {
                this.setState({ classList: null });
            }
            else {
                this.setState({ classList: ['full'] });
            }
        };
        this.onCloseClick = (e) => {
            this.setState({ classList: null });
        };
        if (!this.props.images)
            throw new Error('Slider: no images');
        this.state = { image: 0, classList: null };
    }
    render() {
        // console.debug('Slider.render', this.props.images);
        const images = this.props.images || [];
        return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: this.getCssClassNames() }, { children: [(0, jsx_runtime_1.jsx)("img", { className: 'Slider_image', src: images[this.state.image], onClick: this.onImageClick }), images.length > 1 && ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'Slider__label' }, { children: [images.length > 0 ? this.state.image + 1 : 0, " / ", images.length] }))), images.length > 1 && ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'Slider__arrow left', onClick: this.onPrevClick }, { children: (0, jsx_runtime_1.jsx)(LeftIcon_1.LeftIcon, {}) }))), images.length > 1 && ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'Slider__arrow right', onClick: this.onNextClick }, { children: (0, jsx_runtime_1.jsx)(RightIcon_1.RightIcon, {}) }))), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'Slider__close', onClick: this.onCloseClick }, { children: (0, jsx_runtime_1.jsx)(CloseIcon2_1.CloseIcon2, {}) }))] })));
    }
}
exports.Slider = Slider;
if (typeof window === 'object') {
    // @ts-ignore
    window.Slider = Slider;
}
