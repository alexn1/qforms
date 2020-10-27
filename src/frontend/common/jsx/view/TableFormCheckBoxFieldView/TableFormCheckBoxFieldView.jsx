class TableFormCheckBoxFieldView extends ReactComponent {
    constructor(props) {
        super(props);
        this.span = React.createRef();
    }
    getSpanOffsetWidth() {
        return this.span.current.offsetWidth;
    }
    render() {
        const row = this.props.row;
        const ctrl = this.props.ctrl;
        return (
            <div className="TableFormCheckBoxFieldView" style={ctrl.renderViewStyle(row)}>
                <CheckBox
                    checked={ctrl.renderValueForView(row)}
                    readOnly={true}
                />
            </div>
        );
    }
}
