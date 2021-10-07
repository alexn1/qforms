class RowFormLinkFieldView extends RowFormFieldView {
    render() {
        const ctrl = this.props.ctrl;
        return (
            <div className={this.getCssClassNames()}>
                <a href="#" onClick={ctrl.onClick}>{ctrl.getValueForWidget()}</a>
            </div>
        );
    }
}
window.QForms.RowFormLinkFieldView = RowFormLinkFieldView;
