class RowFormLinkFieldView extends RowFormFieldView {
    render() {
        const ctrl = this.props.ctrl;
        return (
            <div className={this.getClassName()}>
                <a href="#" onClick={ctrl.onClick}>{ctrl.getValueForView()}</a>
            </div>
        );
    }
}
window.QForms.RowFormLinkFieldView = RowFormLinkFieldView;
