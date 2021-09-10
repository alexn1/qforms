class TableFormLinkFieldView extends TableFormFieldView {
    render() {
        const row = this.props.row;
        const ctrl = this.props.ctrl;
        return (
            <div className={this.getClassName()} style={ctrl.renderViewStyle(row)}>
                <a href="#" onClick={ctrl.onClick}>{ctrl.getValueForWidget(row)}</a>
            </div>
        );
    }
}
window.QForms.TableFormLinkFieldView = TableFormLinkFieldView;
