class TableFormFieldView extends ModelView {
    constructor(props) {
        super(props);
        this.span = React.createRef();
    }
    getSpanOffsetWidth() {
        // console.log('TableFormFieldView.getSpanOffsetWidth', this.span.current);
        if (!this.span.current) return 0;
        return this.span.current.offsetWidth;
    }
}
window.QForms.TableFormFieldView = TableFormFieldView;
