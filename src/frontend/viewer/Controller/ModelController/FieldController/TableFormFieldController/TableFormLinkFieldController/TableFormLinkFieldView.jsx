class TableFormLinkFieldView extends TableFormFieldView {
    render() {
        const row = this.props.row;
        const ctrl = this.props.ctrl;
        return (
            <div className={`${this.getCssClassNames()} ellipsis`} style={this.renderViewStyle(row)}>
                <a href="#" onClick={ctrl.onClick}>{ctrl.getValueForWidget(row)}</a>
            </div>
        );
    }
}
window.QForms.TableFormLinkFieldView = TableFormLinkFieldView;
