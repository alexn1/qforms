class RowFormImageFieldView extends RowFormFieldView {
    render() {
        const ctrl = this.props.ctrl;
        return <div className={this.getCssClassNames()} style={ctrl.renderViewStyle(ctrl.getRow())}>
            <Image src={ctrl.getValueForWidget()}/>
        </div>;
    }
}
window.QForms.RowFormImageFieldView = RowFormImageFieldView;
