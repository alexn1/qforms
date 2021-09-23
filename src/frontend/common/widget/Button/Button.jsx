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
    onClick = e => {
        // console.log('Button.onClick', e);
        if (this.props.onClick) this.props.onClick(e);
    }
    isVisible() {
        return this.props.visible === undefined ? true : this.props.visible;
    }
    render() {
        // console.log('Button.render', this.props.title, this.props);
        return (
            <button className={this.getCssClassNames()}
                name={this.props.name}
                id={this.props.id}
                disabled={this.isDisabled()}
                onClick={this.onClick}
                style={{
                    display: !this.isVisible() ? 'none' : null,
                    width  : this.props.width
                }}
            >{this.props.title || this.props.children}</button>
        );
    }
}

window.QForms.Button = Button;
