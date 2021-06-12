class TableFormLinkFieldView extends TableFormFieldView {
    render() {
        const row = this.props.row;
        const ctrl = this.props.ctrl;
        return (
            <div className="TableFormLinkFieldView" style={ctrl.renderViewStyle(row)}>
                <a href="#" onClick={ctrl.onClick}>{ctrl.getValueForView(row)}</a>
            </div>
        );
    }
}
window.QForms.TableFormLinkFieldView = TableFormLinkFieldView;
