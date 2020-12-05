class TimeBox extends ReactComponent {
    constructor(props) {
        // console.log('TimeBox.constructor', props);
        super(props);
        this.state = {
            value: props.value || null,
        };
        if (props.value && typeof props.value !== 'number') {
            throw new Error(`need number type, got ${typeof props.value}`);
        }
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
        // const value = e.target.value.substr(0, 4);
        const target = e.target;
        const start = target.selectionStart;
        const end   = target.selectionEnd;

        if (target.value.length > 5) {
            return;
        }

        const inEnd = start === end && start === target.value.length;
        const stringValue = this.formatValue(target.value);
        console.log('value:', stringValue);

        // console.log('before:', target.selectionStart, target.selectionEnd);
        this.setState({value: stringValue}, () => {
            // console.log('after:', target.selectionStart, target.selectionEnd);
            // console.log('inEnd:', inEnd);
            if (!inEnd) {
                target.selectionStart = start;
                target.selectionEnd   = end;
            }
        });

        /*if (this.props.onChange) {
            this.props.onChange(value);
        }*/
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
    getStringValue() {
        return this.state.value.toString();
    }
    shouldComponentUpdate(nextProps, nextState) {
        // console.log('TimeBox.shouldComponentUpdate', 'nextProps:', nextProps, 'nextState:', nextState);
        this.state.value = nextProps.value;
        return true;
    }
    render() {
        // console.log('TimeBox.render');
        return (
            <input
                ref={this.input}
                id={this.props.id}
                className={this.getClassName()}
                type="text"
                value={this.getStringValue()}
                readOnly={this.props.readOnly}
                onChange={this.onChange}
                placeholder={this.props.placeholder}
                // onKeyDown={this.onKeyDown}
                // onKeyUp={this.onKeyUp}
                onKeyPress={this.onKeyPress}
            />
        );
    }
}
