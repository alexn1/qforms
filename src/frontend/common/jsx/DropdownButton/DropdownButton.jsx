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
                    <li>Action1</li>
                    <li>Action2</li>
                    <li>Action3</li>
                </ul>
            </div>
        );
    }
}
