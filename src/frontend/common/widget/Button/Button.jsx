class Button extends ReactComponent {
    constructor(props) {
        // console.log('Button.constructor', props);
        super(props);
        this.state = {disabled: false};
    }
    isDisabled() {
        if (this.props.enabled !== undefined) return !this.props.enabled;
        return this.state.disabled;
    }
    isVisible() {
        return this.props.visible === undefined ? true : this.props.visible;
    }
    render() {
        // console.log('Button.render', this.props.title, this.props);
        return (
            <button className={this.getCssClassNames()}
                id={this.props.id}
                name={this.props.name}
                disabled={this.isDisabled()}
                onClick={this.props.onClick}
                onFocus={this.props.onFocus}
                onBlur={this.props.onBlur}
                style={{
                    display: !this.isVisible() ? 'none' : null,
                    width  : this.props.width
                }}
            >{this.props.title || this.props.children}</button>
        );
    }
}

window.QForms.Button = Button;
