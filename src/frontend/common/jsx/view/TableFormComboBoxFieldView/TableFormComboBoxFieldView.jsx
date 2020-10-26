class TableFormComboBoxFieldView extends ReactComponent {
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
            <div className="TableFormComboBoxFieldView" style={ctrl.renderViewStyle(row)}>
                <span ref={this.span}>{ctrl.renderValueForView(row)}</span>
            </div>
        );
    }
}