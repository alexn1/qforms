class TableFormTextBoxFieldView extends TableFormFieldView {
    render() {
        const row = this.props.row;
        const ctrl = this.props.ctrl;
        return (
            <div className="TableFormTextBoxFieldView" style={ctrl.renderViewStyle(row)}>
                <span ref={this.span}>{ctrl.getValueForView(row)}</span>
            </div>
        );
    }
}
window.QForms.TableFormTextBoxFieldView = TableFormTextBoxFieldView;
