"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeBox = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const ReactComponent_1 = require("../../ReactComponent");
class TimeBox extends ReactComponent_1.ReactComponent {
    constructor(props) {
        // console.log('TimeBox.constructor', props);
        super(props);
        this.onKeyPress = (event) => {
            // console.log('TimeBox.onKeyPress', event.key, event.target.value);
            if (!['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(event.key)) {
                console.debug('cancel', event.key);
                event.preventDefault();
            }
        };
        this.onChange = (e) => {
            // console.debug('TimeBox.onChange', e.target.value);
            const target = e.target;
            const start = target.selectionStart;
            const end = target.selectionEnd;
            if (target.value.length > 5) {
                return;
            }
            const inEnd = start === end && start === target.value.length;
            const stringValue = this.formatValue(target.value);
            // console.debug('before:', target.selectionStart, target.selectionEnd);
            this.setState({ value: stringValue }, () => {
                // console.debug('after:', target.selectionStart, target.selectionEnd);
                // console.debug('inEnd:', inEnd);
                if (!inEnd) {
                    target.selectionStart = start;
                    target.selectionEnd = end;
                }
                if (this.props.onChange) {
                    let nValue;
                    try {
                        nValue = this.getValue();
                    }
                    catch (err) {
                        console.debug(err.message);
                        nValue = NaN;
                    }
                    // console.debug('nValue:', nValue);
                    this.props.onChange(nValue);
                }
            });
        };
        this.onBlur = (e) => {
            // console.debug('TimeBox.onBlur');
            if (this.props.onBlur) {
                let nValue;
                try {
                    nValue = this.getValue();
                }
                catch (err) {
                    console.debug(err.message);
                    nValue = NaN;
                }
                // console.debug('nValue:', nValue);
                this.props.onBlur(nValue);
            }
        };
        if (props.value && typeof props.value !== 'number') {
            throw new Error(`need number type, got ${typeof props.value}`);
        }
        this.state = {
            value: TimeBox.getStringValue(props.value),
        };
        this.el = react_1.default.createRef();
    }
    formatValue(value) {
        let min = '';
        let sec = '';
        const pure = value.replace(':', '');
        switch (pure.length) {
            case 0:
                break;
            case 1:
                min = pure;
                break;
            case 2:
                min = pure;
                break;
            case 3:
                min = pure.substr(0, 2);
                sec = pure.substr(2, 1);
                break;
            case 4:
                min = pure.substr(0, 2);
                sec = pure.substr(2, 2);
                break;
        }
        return [min, ...(sec ? [sec] : [])].join(':');
    }
    getValue() {
        return TimeBox.getIntegerValue(this.state.value);
    }
    setValue(value) {
        this.setState({ value: TimeBox.getStringValue(value) });
    }
    /*onKeyDown = event => {
        console.debug('TimeBox.onKeyDown', event.which, event.target.value.length, event.target.selectionStart, event.target.selectionEnd, event.key);
        const mask = '00:00';
        if ([8, 46, 37, 39, 36, 35].includes(event.which)) return;
        if (event.which < 96 || event.which > 105) {
            console.debug('cancel');
            event.stopPropagation();
            event.preventDefault();
        }

        if (event.target.value.length + 1 > mask.length) {
            event.stopPropagation();
            event.preventDefault();
        }
    }*/
    /*onKeyUp = event => {
        console.debug('TimeBox.onKeyUp', event.which, event.target.value.length, event.target.selectionStart, event.target.selectionEnd, event.target.value);
        event.stopPropagation();
        event.preventDefault();
    }*/
    static getStringValue(value) {
        // console.debug('TimeBox.getStringValue', value);
        if (value === null)
            return '';
        if (value !== undefined) {
            let h = Math.floor(value / 60);
            let m = Math.floor(value - h * 60);
            if (h < 10)
                h = '0' + h;
            if (m < 10)
                m = '0' + m;
            return `${h}:${m}`;
        }
        return '';
    }
    static getIntegerValue(stringValue) {
        // console.debug('TimeBox.getIntegerValue', stringValue);
        // try {
        if (stringValue === '')
            return null;
        const arr = stringValue.split(':');
        if (!arr[0])
            throw new Error(`no hours: ${stringValue}`);
        if (!arr[1])
            throw new Error(`no minutes: ${stringValue}`);
        if (arr[0].length !== 2)
            throw new Error(`hours incomplete: ${stringValue}`);
        if (arr[1].length !== 2)
            throw new Error(`minutes incomplete: ${stringValue}`);
        const hh = parseInt(arr[0]);
        const mm = parseInt(arr[1]);
        if (hh > 23)
            throw new Error(`hours out of range: ${mm}, ${stringValue}`);
        if (mm > 59)
            throw new Error(`minutes out of range: ${mm}, ${stringValue}`);
        return hh * 60 + mm;
        // } catch (err) {
        //     console.error(err.message);
        //     return NaN;
        // }
    }
    static splitTime(value) {
        const hours = Math.floor(value / 60);
        const minutes = value - hours * 60;
        return [hours, minutes];
    }
    shouldComponentUpdate(nextProps, nextState) {
        // console.debug('TimeBox.shouldComponentUpdate', this.state, nextState);
        if (this.props.value !== nextProps.value) {
            // @ts-ignore
            this.state.value = TimeBox.getStringValue(nextProps.value);
            return true;
        }
        if (this.props.readOnly !== nextProps.readOnly)
            return true;
        if (this.props.placeholder !== nextProps.placeholder)
            return true;
        if (this.state.value !== nextState.value)
            return true;
        return false;
    }
    render() {
        // console.debug('TimeBox.render', this.state.value);
        return ((0, jsx_runtime_1.jsx)("input", { ref: this.el, className: this.getCssClassNames(), type: 'text', id: this.props.id, readOnly: this.props.readOnly, placeholder: this.props.placeholder, value: this.state.value, onChange: this.onChange, 
            // onKeyDown={this.onKeyDown}
            // onKeyUp={this.onKeyUp}
            onKeyPress: this.onKeyPress, onBlur: this.onBlur }));
    }
}
exports.TimeBox = TimeBox;
if (typeof window === 'object') {
    // @ts-ignore
    window.TimeBox = TimeBox;
}
