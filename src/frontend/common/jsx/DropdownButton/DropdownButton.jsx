class DropdownButton extends React.Component{
    constructor(props) {
        super(props);
        if (props.cb) props.cb(this);
        this.state = {
            open: false
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
    render() {
        return (
            <div className={`DropdownButton ${this.state.open && 'show'}`}>
                <button onClick={this.onButtonClick} onBlur={this.onButtonBlur}>Actions</button>
                <ul onMouseDown={this.onUlMouseDown} onClick={this.onUlClick}>
                    {this.props.actions && this.props.actions.map(action =>
                        <li key={action.name} data-action={action.name}>{action.title}</li>
                    )}
                </ul>
            </div>
        );
    }
}
