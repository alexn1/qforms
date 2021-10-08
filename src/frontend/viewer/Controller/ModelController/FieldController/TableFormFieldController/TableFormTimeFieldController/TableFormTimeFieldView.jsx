class TableFormTimeFieldView extends TableFormFieldView {
    render() {
        const row = this.props.row;
        const ctrl = this.props.ctrl;
        return <div className={`${this.getCssClassNames()} ellipsis`} style={this.renderViewStyle(row)}>
            <span ref={this.span}>{ctrl.getValueForWidget(row)}</span>
        </div>;
    }
}
window.QForms.TableFormTimeFieldView = TableFormTimeFieldView;
