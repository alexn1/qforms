class Toolbar extends ReactComponent {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="Toolbar">
                {this.props.elements.map(e => React.createElement(e.type, e.props))}
            </div>
        );
    }
}
