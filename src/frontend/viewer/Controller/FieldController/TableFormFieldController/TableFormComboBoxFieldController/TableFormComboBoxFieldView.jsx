class TableFormComboBoxFieldView extends TableFormFieldView {
    render() {
        const row = this.props.row;
        const ctrl = this.props.ctrl;
        return (
            <div className="TableFormComboBoxFieldView" style={ctrl.renderViewStyle(row)}>
                <span ref={this.span}>{ctrl.getValueForView(row)}</span>
            </div>
        );
    }
}
window.QForms.TableFormComboBoxFieldView = TableFormComboBoxFieldView;
