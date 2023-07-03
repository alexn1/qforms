"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropdownDatePicker = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const ReactComponent_1 = require("../../ReactComponent");
const Helper_1 = require("../../Helper");
const CloseIcon_1 = require("../../icon/CloseIcon");
const DateIcon_1 = require("../../icon/DateIcon");
const CloseIcon2_1 = require("../../icon/CloseIcon2");
const DatePicker_1 = require("../DatePicker/DatePicker");
require("./DropdownDatePicker.less");
// oldDates boolean true
class DropdownDatePicker extends ReactComponent_1.ReactComponent {
    constructor(props) {
        // console.debug('DropdownDatePicker.constructor', props);
        super(props);
        this.onInputClick = (e) => {
            // console.debug('DropdownDatePicker.onInputClick', e);
            if (this.props.readOnly)
                return;
            this.setState((prevState) => ({ open: !prevState.open }));
        };
        this.onInputKeyDown = (e) => {
            // console.debug('DropdownDatePicker.onInputKeyDown', e.key);
            if (e.key === 'Escape' && this.state.open) {
                this.setState({ open: false });
                e.stopPropagation();
            }
        };
        this.onCloseDown = async (e) => {
            // console.debug('DropdownDatePicker.onCloseDown', e);
            this.setState({ value: null });
            if (this.props.onChange) {
                this.props.onChange(null);
            }
        };
        this.onBlur = (e) => {
            // console.debug('DropdownDatePicker.onBlur');
            if (this.state.open) {
                this.setState({ open: false });
            }
        };
        this.onDatePickerMouseDown = (e) => {
            // console.debug('DropdownDatePicker.onDatePickerMouseDown');
            e.preventDefault();
            // e.stopPropagation();
            // return false;
        };
        this.onDatePickerDateSelected = (date) => {
            // console.debug('DropdownDatePicker.onDatePickerDateSelected', date);
            const value = new Date(date[0], date[1], date[2]);
            this.setState({ open: false, value });
            if (this.props.onChange) {
                this.props.onChange(value);
            }
        };
        this.state = {
            open: false,
            value: props.value || null,
        };
        if (props.value && !(props.value instanceof Date)) {
            throw new Error(`need Date type, got ${typeof props.value}`);
        }
    }
    getFormat() {
        // if (this.props.format) return this.props.format;
        // return '{DD}.{MM}.{YYYY} {hh}:{mm}:{ss}';
        return this.props.format || '{DD}.{MM}.{YYYY} {hh}:{mm}:{ss}';
    }
    getStringValue() {
        const value = this.getValue();
        if (value) {
            let format = this.getFormat();
            if (this.isDebugMode()) {
                const time = Helper_1.Helper.formatDate(value, '{hh}:{mm}:{ss}');
                if (format === '{DD}.{MM}.{YYYY}' && time !== '00:00:00') {
                    format = '{DD}.{MM}.{YYYY} {hh}:{mm}:{ss}';
                }
            }
            return Helper_1.Helper.formatDate(value, format);
        }
        return '';
    }
    /*getMinDate() {
        if (this.props.getMinDate) {
            return this.props.getMinDate();
        } else if (this.props.oldDates === false) {
            return DatePicker.getTodayArr();
        }
        return null;
    }*/
    getSelectedMonth() {
        if (this.getValue()) {
            return [this.getValue().getFullYear(), this.getValue().getMonth()];
        }
        return null;
    }
    getSelectedDate() {
        if (this.getValue()) {
            return [
                this.getValue().getFullYear(),
                this.getValue().getMonth(),
                this.getValue().getDate(),
            ];
        }
        return null;
    }
    getValue() {
        return this.state.value;
    }
    shouldComponentUpdate(nextProps, nextState) {
        // console.debug('DropdownDatePicker.shouldComponentUpdate', 'nextProps:', nextProps, 'nextState:', nextState);
        // @ts-ignore
        this.state.value = nextProps.value;
        return true;
    }
    getClassList() {
        return [...super.getClassList(), ...(this.props.readOnly ? ['read-only'] : [])];
    }
    renderInput() {
        return ((0, jsx_runtime_1.jsx)("input", { className: `${this.getCssBlockName()}__input`, type: 'text', readOnly: true, onClick: this.onInputClick, onBlur: this.onBlur, value: this.getStringValue(), placeholder: this.props.placeholder, onKeyDown: this.onInputKeyDown }));
    }
    renderCloseIcon() {
        return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: `${this.getCssBlockName()}__close ${this.getStringValue() !== '' && !this.props.readOnly ? 'visible' : ''}`, onMouseDown: this.onCloseDown }, { children: (0, jsx_runtime_1.jsx)(CloseIcon_1.CloseIcon, {}) })));
    }
    renderDateIcon() {
        return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: `${this.getCssBlockName()}__icon` }, { children: (0, jsx_runtime_1.jsx)(DateIcon_1.DateIcon, {}) })));
    }
    renderDatePicker() {
        return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: `${this.getCssBlockName()}__date-picker-container` }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: `${this.getCssBlockName()}__date-picker-close` }, { children: (0, jsx_runtime_1.jsx)(CloseIcon2_1.CloseIcon2, {}) })), (0, jsx_runtime_1.jsx)(DatePicker_1.DatePicker
                // minDate={this.getMinDate()}
                , { 
                    // minDate={this.getMinDate()}
                    minDate: this.props.minDate, selectedMonth: this.getSelectedMonth(), selectedDate: this.getSelectedDate(), onMouseDown: this.onDatePickerMouseDown, onDateSelected: this.onDatePickerDateSelected, selectToday: this.props.selectToday, highlightedDate: this.props.highlightedDate })] })));
    }
    render() {
        // console.debug('DropdownDatePicker.render', this.props, this.state);
        return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: this.getCssClassNames() }, { children: [this.renderInput(), this.renderCloseIcon(), this.renderDateIcon(), this.state.open && this.renderDatePicker()] })));
    }
    isDebugMode() {
        return this.props.debug === true;
    }
}
exports.DropdownDatePicker = DropdownDatePicker;
if (typeof window === 'object') {
    // @ts-ignore
    window.DropdownDatePicker = DropdownDatePicker;
}
