class DropdownButton extends ReactComponent{
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            disabled: false
        };
    }
    onButtonClick = e => {
        // console.log('DropdownButton.onButtonClick');
        this.setState(state => ({open: !state.open}));
    }
    onButtonBlur = e => {
        // console.log('DropdownButton.onButtonBlur');
        if (this.state.open) {
            this.setState({open: false});
        }
    }
    onUlMouseDown = e => {
        // console.log('DropdownButton.onUlMouseDown');
        e.preventDefault();
    }
    onLiClick = async e => {
        // console.log('DropdownButton.onLiClick', e.currentTarget);
        const li = e.currentTarget;
        this.setState({open: false}, () => {
            if (this.props.onClick) {
                this.props.onClick(li);
            }
        });
    }
    isEnabled() {
        if (this.props.enabled !== undefined) return this.props.enabled;
        // if (this.props.isDisabled) return this.props.isDisabled(this.props.name);
        return !this.state.disabled;
    }
    render() {
        return (
            <div className={`${this.getCssClassNames()} ${this.state.open && 'show'}`}>
                <Button
                    classList={[`${this.getCssBlockName()}__button`]}
                    onClick={this.onButtonClick}
                    onBlur={this.onButtonBlur}
                    enabled={this.isEnabled()}
                >{this.props.title || this.props.children}</Button>
                <ul className={`${this.getCssBlockName()}__dropdown`} onMouseDown={this.onUlMouseDown}>
                    {this.props.actions && this.props.actions.map(action =>
                        <li className={`${this.getCssBlockName()}__item`}
                            key={action.name}
                            data-action={action.name}
                            onClick={this.onLiClick}
                        >{action.title}</li>
                    )}
                </ul>
            </div>
        );
    }
}

window.QForms.DropdownButton = DropdownButton;
