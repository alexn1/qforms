"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Select = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const ReactComponent_1 = require("../../ReactComponent");
const CloseIcon_1 = require("../../icon/CloseIcon");
const ArrowIcon_1 = require("../../icon/ArrowIcon");
require("./Select.less");
class Select extends ReactComponent_1.ReactComponent {
    constructor(props) {
        super(props);
        this.onKeyDown = async (e) => {
            // console.log('Select.onKeyDown');
            if (this.isVisible()) {
                this.setState({ visible: false });
                e.stopPropagation();
            }
        };
        this.onInputMouseDown = async (e) => {
            console.log('Select.onInputMouseDown');
            if (this.props.readOnly)
                return;
            if (this.props.onMouseDown) {
                await this.props.onMouseDown(e);
            }
            else {
                if (!this.isVisible()) {
                    const [selected] = this.el.current.querySelectorAll('li.selected');
                    // console.log('selected:', selected);
                    if (selected) {
                        // console.log('selected.offsetTop:', selected.offsetTop);
                        const scrollTop = selected.offsetTop -
                            this.dropdown.current.getBoundingClientRect().height / 2 +
                            selected.getBoundingClientRect().height / 2;
                        console.log('scrollTop:', scrollTop);
                        this.dropdown.current.scrollTop = scrollTop;
                        console.log('this.dropdown.current.scrollTop', this.dropdown.current.scrollTop);
                    }
                }
                this.setState((prevState) => {
                    return { visible: !prevState.visible };
                });
            }
        };
        this.onInputBlur = async (e) => {
            console.log('Select.onInputBlur', e.target);
            this.setState({ visible: false });
        };
        this.onDropdownMouseDown = async (e) => {
            e.preventDefault();
        };
        this.onDropdownClick = async (e) => {
            console.log('Select.onDropdownClick', e.target.offsetTop);
            const value = JSON.parse(e.target.dataset.value);
            // console.log('value:', value);
            this.setState({ value: value, visible: false }, async () => {
                if (this.props.onChange) {
                    await this.props.onChange(value.toString());
                }
            });
        };
        this.onCloseClick = async (e) => {
            this.setState({ value: '' });
            if (this.props.onChange) {
                await this.props.onChange('');
            }
            this.getElement();
        };
        this.el = react_1.default.createRef();
        this.dropdown = react_1.default.createRef();
        this.state = {
            value: this.getInitialValue(),
            visible: false,
        };
    }
    isVisible() {
        return this.state.visible;
    }
    getInitialValue() {
        // console.log('Select.getInitialValue', this.props.value);
        let value = null;
        if (this.props.value !== undefined && this.props.value !== null) {
            value = this.props.value;
            const item = this.getItems().find((item) => item.value === this.props.value);
            if (!item) {
                if (this.isNullable() && value === '') {
                }
                else {
                    console.error(`Select: no item for value:`, JSON.stringify(this.props.value));
                    console.log('items:', this.getItems());
                }
            }
        }
        else {
            if (this.isNullable()) {
                value = '';
            }
            else {
                if (this.props.items.length) {
                    value = this.props.items[0].value;
                }
                else {
                    value = '';
                }
            }
        }
        if (value === null)
            throw new Error('null is wrong value for Select');
        // console.log('select value:', value);
        return value;
    }
    getValue() {
        return this.state.value;
    }
    isNullable() {
        return this.props.nullable !== undefined ? this.props.nullable : true;
    }
    getVisibility() {
        return this.isVisible() ? 'visible' : 'hidden';
    }
    getDisplay() {
        return this.isVisible() ? 'block' : 'none';
    }
    getItems() {
        return this.props.items || [];
    }
    getValueTitle(value) {
        if (value === '')
            return '';
        const item = this.getItems().find((item) => item.value === value);
        if (!item)
            throw new Error(`cannot find item by value: ${value}`);
        // console.log('item:', item);
        return item.title || item.value;
    }
    shouldComponentUpdate(nextProps, nextState) {
        // console.log('Select.shouldComponentUpdate', 'nextProps:', nextProps, 'nextState:', nextState);
        // @ts-ignore
        this.state.value = nextProps.value;
        return true;
    }
    isCloseVisible() {
        if (this.props.readOnly)
            return false;
        return this.state.value !== '';
    }
    renderInput() {
        return ((0, jsx_runtime_1.jsx)("input", { className: `${this.getCssBlockName()}__input`, readOnly: true, disabled: this.props.readOnly, placeholder: this.props.placeholder, onBlur: this.onInputBlur, value: this.getValueTitle(this.getValue()), onMouseDown: this.onInputMouseDown, onKeyDown: this.onKeyDown }));
    }
    renderClose() {
        return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: `${this.getCssBlockName()}__close ${this.isCloseVisible() ? 'visible' : ''}`, onClick: this.onCloseClick }, { children: (0, jsx_runtime_1.jsx)(CloseIcon_1.CloseIcon, {}) })));
    }
    renderIcon() {
        return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: `${this.getCssBlockName()}__icon ${this.isVisible() ? 'up' : ''}` }, { children: (0, jsx_runtime_1.jsx)(ArrowIcon_1.ArrowIcon, {}) })));
    }
    renderDropdown() {
        return ((0, jsx_runtime_1.jsxs)("ul", Object.assign({ ref: this.dropdown, className: `${this.getCssBlockName()}__dropdown`, style: {
                display: this.getDisplay(),
            }, onMouseDown: this.onDropdownMouseDown, onClick: this.onDropdownClick }, { children: [this.isNullable() && ((0, jsx_runtime_1.jsx)("li", Object.assign({ className: `${this.getCssBlockName()}__item`, "data-value": '""' }, { children: "\u00A0" }))), this.getItems().map((item) => {
                    return ((0, jsx_runtime_1.jsx)("li", Object.assign({ className: `${this.getCssBlockName()}__item ellipsis ${this.getValue() === item.value ? 'selected' : ''}`, "data-value": JSON.stringify(item.value) }, { children: item.title || item.value }), item.value));
                })] })));
    }
    render() {
        // console.log('Select.render', this.state.value, this.getValueTitle(this.state.value));
        return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ ref: this.el, className: this.getCssClassNames() }, { children: [this.renderInput(), this.isNullable() && this.renderClose(), this.renderIcon(), this.renderDropdown()] })));
    }
}
exports.Select = Select;
if (typeof window === 'object') {
    // @ts-ignore
    window.Select = Select;
}
