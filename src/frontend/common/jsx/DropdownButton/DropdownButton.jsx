class DropdownButton extends React.Component{
    constructor(props) {
        super(props);
        if (props.cb) props.cb(this);
    }
    render() {
        return (
            <div className="DropdownButton">
                <button>Actions</button>
                <ul>
                    {this.props.actions.map(action => <li key={action.name} data-action={action.name}>{action.title}</li>)}
                </ul>
            </div>
        );
    }
}
