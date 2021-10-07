class RowFormImageFieldView extends RowFormFieldView {
    onImageClick = async e => {
        const ctrl = this.props.ctrl;
        console.log('RowFormImageFieldView.onImageClick');
    }
    render() {
        const ctrl = this.props.ctrl;
        return <div className={this.getCssClassNames()} style={ctrl.renderViewStyle(ctrl.getRow())}>
            <Image src={ctrl.getValueForWidget()}
                   onClick={this.onImageClick}
            />
        </div>;
    }
}
window.QForms.RowFormImageFieldView = RowFormImageFieldView;
