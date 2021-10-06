class TableFormFieldView extends ReactComponent {
    constructor(props) {
        super(props);
        this.span = React.createRef();
    }
    getSpanOffsetWidth() {
        // console.log('TableFormFieldView.getSpanOffsetWidth', this.span.current);
        return this.span.current.offsetWidth;
    }
}
window.QForms.TableFormFieldView = TableFormFieldView;
