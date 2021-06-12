class TableFormFieldView extends ReactComponent {
    constructor(props) {
        super(props);
        this.span = React.createRef();
    }
    getSpanOffsetWidth() {
        return this.span.current.offsetWidth;
    }
}
window.QForms.TableFormFieldView = TableFormFieldView;
