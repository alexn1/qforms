class DropdownButton extends React.Component{
    constructor(props) {
        super(props);
        if (props.cb) props.cb(this);
        this.state = {
            open: false
        };
    }
    onClick = e => {
        console.log('DropdownButton.onClick', this.state);
        this.setState(state => ({
            open: !state.open
        }));
    }
    render() {
        return (
            <div className={`DropdownButton ${this.state.open && 'show'}`}>
                <button onClick={this.onClick}>Actions</button>
                <ul>
                    {this.props.actions.map(action => <li key={action.name} data-action={action.name}>{action.title}</li>)}
                </ul>
            </div>
        );
    }
}
