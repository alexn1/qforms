class TimeBox extends ReactComponent {
    constructor(props) {
        // console.log('TimeBox.constructor', props);
        super(props);
        if (props.value && typeof props.value !== 'number') {
            throw new Error(`need number type, got ${typeof props.value}`);
        }
        this.state = {
            value: TimeBox.getStringValue(props.value)
        };
        this.input = React.createRef();
    }
    getInput() {
        return this.input.current;
    }
    onKeyPress = event => {
        // console.log('TimeBox.onKeyPress', event.key, event.target.value);
        if (!['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(event.key)) {
            console.log('cancel', event.key);
            event.preventDefault();
        }
    }
    formatValue(value) {
        let min = '';
        let sec = '';
        const pure = value.replace(':', '');
        switch (pure.length) {
            case 0: break;
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
        return [
            min,
            ...(sec ? [sec] : [])
        ].join(':');
    }
    onChange = e => {
        // console.log('TimeBox.onChange', e.target.value);
        const target = e.target;
        const start = target.selectionStart;
        const end   = target.selectionEnd;
        if (target.value.length > 5) {
            return;
        }
        const inEnd = start === end && start === target.value.length;
        const stringValue = this.formatValue(target.value);
        // console.log('before:', target.selectionStart, target.selectionEnd);
        this.setState({value: stringValue}, () => {
            // console.log('after:', target.selectionStart, target.selectionEnd);
            // console.log('inEnd:', inEnd);
            if (!inEnd) {
                target.selectionStart = start;
                target.selectionEnd   = end;
            }
            if (this.props.onChange) {
                let nValue;
                try {
                    nValue = this.getValue();
                } catch (err) {
                    console.log(err.message);
                    nValue = NaN;
                }
                // console.log('nValue:', nValue);
                this.props.onChange(nValue);
            }
        });

    }
    getValue() {
        return TimeBox.getIntegerValue(this.state.value);
    }
    setValue(value) {
        this.setState({value: TimeBox.getStringValue(value)});
    }
    onBlur = e => {
        // console.log('TimeBox.onBlur');
        if (this.props.onBlur) {
            let nValue;
            try {
                nValue = this.getValue();
            } catch (err) {
                console.log(err.message);
                nValue = NaN;
            }
            // console.log('nValue:', nValue);
            this.props.onBlur(nValue);
        }
    }
    /*onKeyDown = event => {
        console.log('TimeBox.onKeyDown', event.which, event.target.value.length, event.target.selectionStart, event.target.selectionEnd, event.key);
        const mask = '00:00';
        if ([8, 46, 37, 39, 36, 35].includes(event.which)) return;
        if (event.which < 96 || event.which > 105) {
            console.log('cancel');
            event.stopPropagation();
            event.preventDefault();
        }

        if (event.target.value.length + 1 > mask.length) {
            event.stopPropagation();
            event.preventDefault();
        }
    }*/
    /*onKeyUp = event => {
        console.log('TimeBox.onKeyUp', event.which, event.target.value.length, event.target.selectionStart, event.target.selectionEnd, event.target.value);
        event.stopPropagation();
        event.preventDefault();
    }*/
    static getStringValue(value) {
        // console.log('TimeBox.getStringValue', value);
        if (value === null) return '';
        if (value !== undefined) {
            let h = Math.floor(value / 60);
            let m = Math.floor(value - h * 60);
            if (h < 10) h = '0' + h;
            if (m < 10) m = '0' + m;
            return `${h}:${m}`;
        }
        return '';
    }
    static getIntegerValue(stringValue) {
        // console.log('TimeBox.getIntegerValue', stringValue);
        // try {
            if (stringValue === '') return null;
            const arr = stringValue.split(':');
            if (!arr[0]) throw new Error(`no hours: ${stringValue}`);
            if (!arr[1]) throw new Error(`no minutes: ${stringValue}`);
            if (arr[0].length !== 2) throw new Error(`hours incomplete: ${stringValue}`);
            if (arr[1].length !== 2) throw new Error(`minutes incomplete: ${stringValue}`);
            const hh = parseInt(arr[0]);
            const mm = parseInt(arr[1]);
            if (hh > 23) throw new Error(`hours out of range: ${mm}, ${stringValue}`);
            if (mm > 59) throw new Error(`minutes out of range: ${mm}, ${stringValue}`);
            return hh*60 + mm;
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
        // console.log('TimeBox.shouldComponentUpdate', this.state, nextState);
        if (this.props.value !== nextProps.value) {
            this.state.value = TimeBox.getStringValue(nextProps.value);
            return true;
        }
        if (this.props.readOnly !== nextProps.readOnly) return true;
        if (this.props.placeholder !== nextProps.placeholder) return true;
        if (this.state.value !== nextState.value) return true;
        return false;
    }
    render() {
        // console.log('TimeBox.render', this.state.value);
        return (
            <input
                type="text"
                className={this.getClassName()}
                id={this.props.id}
                readOnly={this.props.readOnly}
                placeholder={this.props.placeholder}
                value={this.state.value}
                onChange={this.onChange}
                // onKeyDown={this.onKeyDown}
                // onKeyUp={this.onKeyUp}
                onKeyPress={this.onKeyPress}
                onBlur={this.onBlur}
                ref={this.input}
            />
        );
    }
}

window.QForms.TimeBox = TimeBox;
