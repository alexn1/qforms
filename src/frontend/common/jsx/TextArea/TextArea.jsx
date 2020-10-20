class TextArea extends ReactComponent {
    constructor(props) {
        // console.log('TextArea.constructor', props);
        super(props);
        this.state = {
            value: this.props.value || ''
        }
    }
    onChange = e => {
        // console.log('TextArea.onChange', e.target.value);
        this.setState({value: e.target.value});
        if (this.props.onChange) {
            this.props.onChange(e.target.value);
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        // console.log('TextArea.shouldComponentUpdate', 'nextProps:', nextProps, 'nextState:', nextState);
        this.state.value = nextProps.value;
        return true;
    }
    render() {
        // console.log('TextArea.render');
        return (
            <textarea
                value={this.state.value}
                readOnly={this.props.readOnly}
                onChange={this.onChange}
                placeholder={this.props.placeholder}
                rows={this.props.rows}
                cols={this.props.cols}
            />
        );
    }
}
