class Button extends ReactComponent {
    constructor(props) {
        super(props);
        this.state = {disabled: false};
    }
    isDisabled() {
        if (this.props.isDisabled) {
            return this.props.isDisabled(this.props.name);
        }
        return this.state.disabled;
    }
    disable() {
        // console.log('Button.disable');
        return new Promise(resolve => this.setState({disabled: true}, resolve));
    }
    enable() {
        // console.log('Button.enable');
        return new Promise(resolve => this.setState({disabled: false}, resolve));
    }
    setDisabled(value) {
        return new Promise(resolve => {
            if (this.state.disabled === value) {
                resolve();
            } else {
                this.setState({disabled: value}, resolve)
            }
        });
    }
    onClick = e => {
        // console.log('Button.onClick', e);
        if (this.props.onClick) this.props.onClick(e);
    }
    render() {
        return (
            <button name={this.props.name} disabled={this.isDisabled()} onClick={this.onClick}>{this.props.title}</button>
        );
    }
}
