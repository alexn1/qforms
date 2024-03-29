import React from 'react';
import { ReactComponent } from '../ReactComponent';

export class PhoneBox extends ReactComponent {
    constructor(props) {
        super(props);
        this.el = React.createRef();
        this.state = {
            value: PhoneBox.formatPhoneNumber(this.props.value || ''),
        };
    }

    getValue() {
        return PhoneBox.clearValue(this.state.value);
    }

    onKeyPress = (e) => {
        // console.debug('PhoneBox.onKeyPress', e.key, e.target.value);
        // console.debug('start/end', e.target.selectionStart, e.target.selectionEnd);
        if (!['+', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(e.key)) {
            e.preventDefault();
        }
        if (
            e.key === '+' &&
            e.target.value.length &&
            Math.abs(e.target.selectionEnd - e.target.selectionStart) !== e.target.value.length
        ) {
            e.preventDefault();
        }
    };

    onChange = (e) => {
        // console.debug('PhoneBox.onChange', e.target.value);
        const start = e.target.selectionStart;
        const end = e.target.selectionEnd;
        const len = e.target.value.length;
        // console.debug('start/end/len:', start, end, len);

        // disable edition in middle
        if (start !== end || start !== len) {
            return;
        }

        // value pipeline
        let value = PhoneBox.clearValue(e.target.value);
        value = PhoneBox.ifNoCodeAddRussianCode(value);

        // state
        // @ts-ignore
        this.state.value = PhoneBox.formatPhoneNumber(value);
        this.setState({ value: this.state.value }); // for render only

        // event
        if (this.props.onChange) {
            this.props.onChange(value);
        }
    };

    onBlur = (e) => {
        // console.debug('PhoneBox.onBlur');
        let value = PhoneBox.clearValue(e.target.value);
        value = PhoneBox.ifNoCodeAddRussianCode(value);
        // console.debug('value:', value);

        // event
        if (this.props.onBlur) {
            this.props.onBlur(value);
        }
    };

    shouldComponentUpdate(nextProps, nextState) {
        // console.debug('TextBox.shouldComponentUpdate', 'nextProps:', nextProps, 'nextState:', nextState);
        if (nextProps.value !== undefined) {
            // @ts-ignore
            this.state.value = PhoneBox.formatPhoneNumber(nextProps.value);
        }
        return true;
    }

    render() {
        // console.debug('TextBox.render');
        return (
            <input
                ref={this.el}
                className={this.getCssClassNames()}
                type={'text'}
                id={this.props.id}
                name={this.props.name}
                readOnly={this.props.readOnly}
                disabled={this.props.disabled}
                placeholder={this.props.placeholder}
                autoFocus={this.props.autoFocus}
                spellCheck={this.props.spellCheck}
                autoComplete={this.props.autocomplete}
                value={this.state.value}
                onFocus={this.props.onFocus}
                onChange={this.onChange}
                onBlur={this.onBlur}
                onKeyPress={this.onKeyPress}
            />
        );
    }

    static clearValue(value) {
        return value.replace(/[^\+0-9]/g, '');
    }

    static ifNoCodeAddRussianCode(value) {
        if (value === '') {
        } else if (value.match(/^8/)) {
            return value.replace(/^8/, '+7');
        } else if (value.match(/^7/)) {
            return `+${value}`;
        } else if (value[0] !== '+') {
            return `+7${value}`;
        }
        return value;
    }

    static formatPhoneNumber(_value) {
        const value = PhoneBox.clearValue(_value);

        // russian country code
        const arr = /(^\+7)(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/.exec(value);
        // console.debug('arr:', arr);
        if (arr) {
            if (arr[5]) {
                return `${arr[1]} ${arr[2]} ${arr[3]}-${arr[4]}-${arr[5]}`;
            }
            if (arr[4]) {
                return `${arr[1]} ${arr[2]} ${arr[3]}-${arr[4]}`;
            }
            if (arr[3]) {
                return `${arr[1]} ${arr[2]} ${arr[3]}`;
            }
            if (arr[2]) {
                return `${arr[1]} ${arr[2]}`;
            }
            if (arr[1]) {
                return `${arr[1]}`;
            }
        }
        return value;
    }
}

if (typeof window === 'object') {
    // @ts-ignore
    window.PhoneBox = PhoneBox;
}
