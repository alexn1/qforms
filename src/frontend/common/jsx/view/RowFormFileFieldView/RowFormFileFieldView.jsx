class RowFormFileFieldView extends RowFormFieldView {
    render() {
        const ctrl = this.props.ctrl;
        return <div className={this.getClassName()} style={ctrl.renderViewStyle(ctrl.getRow())}>
            <Image src={ctrl.renderValueForView()}/>
            <a href={ctrl.renderValueForView()}>Download</a>
            <input type="file" onChange={ctrl.onFileChange}/>
        </div>;
    }
}
