class DropdownButton extends React.Component{
    constructor(props) {
        super(props);
        if (props.cb) props.cb(this);
        this.state = {
            open: false
        };
    }
    onClick = e => {
        console.log('DropdownButton.onClick');
        this.setState(state => ({
            open: !state.open
        }));
    }
    onBlur = e => {
        console.log('DropdownButton.onBlur');
        if (this.state.open) {
            this.setState({open: false});
        }
    }
    render() {
        return (
            <div className={`DropdownButton ${this.state.open && 'show'}`}>
                <button onClick={this.onClick} onBlur={this.onBlur}>Actions</button>
                <ul>
                    {this.props.actions.map(action => <li key={action.name} data-action={action.name}>{action.title}</li>)}
                </ul>
            </div>
        );
    }
}
