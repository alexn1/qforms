class TableFormTextAreaFieldView extends TableFormFieldView {
    render() {
        const row = this.props.row;
        const ctrl = this.props.ctrl;
        return <div className={`${this.getCssClassNames()} ellipsis`} style={ctrl.renderViewStyle(row)}>
            <span ref={this.span}>{ctrl.getValueForWidget(row)}</span>
        </div>;
    }
}
window.QForms.TableFormTextAreaFieldView = TableFormTextAreaFieldView;
