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
    getStyle() {
        return {
            display: !this.isVisible() ? 'none' : null,
            width  : this.props.width
        };
    }
    disable() {
        this.setState({disabled: true});
    }
    enable() {
        this.setState({disabled: false});
    }
    render() {
        // console.log('Button.render', this.props.title, this.props);
        return (
            <button className={this.getCssClassNames()}
                id={this.props.id}
                type={this.props.type}
                name={this.props.name}
                disabled={this.isDisabled()}
                onClick={this.props.onClick}
                onFocus={this.props.onFocus}
                onBlur={this.props.onBlur}
                onKeyDown={this.props.onKeyDown}
                style={this.getStyle()}
            >{this.props.title || this.props.children}</button>
        );
    }
}

window.QForms.Button = Button;
