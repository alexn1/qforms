class TableFormTextBoxFieldView extends ReactComponent {
    constructor(props) {
        super(props);
        this.span = React.createRef();
    }
    onClick = e => {
        console.log('TableFormTextBoxFieldView.onClick', this.span.current);
        console.log('offsetWidth:', this.span.current.offsetWidth);
    }
    getSpanOffsetWidth() {
        return this.span.current.offsetWidth;
    }
    render() {
        const row = this.props.row;
        const ctrl = this.props.ctrl;
        return (
            <div className="TableFormTextBoxFieldView" /*onClick={this.onClick}*/>
                <span ref={this.span}>{ctrl.getValueForView(row)}</span>
            </div>
        );
    }
}
