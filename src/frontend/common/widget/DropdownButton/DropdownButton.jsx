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
    onUlClick = e => {
        // console.log('DropdownButton.onUlClick', e);
        e.persist();
        this.setState({open: false}, () => {
            if (this.props.onClick) {
                this.props.onClick(e.target);
            }
        });
    }
    isDisabled() {
        if (this.props.enabled !== undefined) return !this.props.enabled;
        // if (this.props.isDisabled) return this.props.isDisabled(this.props.name);
        return this.state.disabled;
    }
    render() {
        return (
            <div className={`DropdownButton ${this.state.open && 'show'}`}>
                <button
                    onClick={this.onButtonClick}
                    onBlur={this.onButtonBlur}
                    disabled={this.isDisabled()}
                >{this.props.title}</button>
                <ul onMouseDown={this.onUlMouseDown} onClick={this.onUlClick}>
                    {this.props.actions && this.props.actions.map(action =>
                        <li key={action.name} data-action={action.name}>{action.title}</li>
                    )}
                </ul>
            </div>
        );
    }
}

window.QForms.DropdownButton = DropdownButton;
