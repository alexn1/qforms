class CheckBox extends ReactComponent {
    constructor(props) {
        super(props);
        if (
            this.props.checked !== undefined &&
            this.props.checked !== null &&
            typeof this.props.checked !== 'boolean') {
            throw new Error(`wrong checked prop: ${this.props.checked}`);
        }
        this.state = {
            checked: typeof this.props.checked === 'boolean' ? this.props.checked : null
        };
    }

    onChange = e => {
        // console.log('CheckBox.onChange', e.target.checked, this.props.readOnly);
        if (!this.props.readOnly) {
            this.setState(prevState => {
                if (this.props.onChange) this.props.onChange(!prevState.checked);
                return {checked: !prevState.checked};
            });
        }
    }
    onClick = e => {
        if (!this.props.readOnly) {
            if (this.props.onChange) this.props.onChange(true);
            this.setState({checked: true});
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        // console.log('TextBox.shouldComponentUpdate', 'nextProps:', nextProps, 'nextState:', nextState);
        this.state.checked = typeof nextProps.checked === 'boolean' ? nextProps.checked : null;
        return true;
    }
    render() {
        if (this.state.checked === null) {
            return (<span
                style={{
                    width: '16px',
                    height: '16px',
                    // backgroundColor: 'yellow',
                    display: 'inline-block',
                    textAlign: 'center',
                    cursor: 'default'
                }}
                onClick={this.onClick}
            >?</span>);
        }
        return (
            <input
                type="checkbox"
                checked={this.state.checked}
                readOnly={this.props.readOnly}
                disabled={this.props.disabled}
                onChange={this.onChange}
            />
        );
    }
}
