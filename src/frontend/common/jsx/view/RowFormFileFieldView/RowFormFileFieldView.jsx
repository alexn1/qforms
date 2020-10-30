class RowFormFileFieldView extends RowFormFieldView {
    render() {
        const ctrl = this.props.ctrl;
        const value = ctrl.renderValueForView();
        return <div className={this.getClassName()} style={ctrl.renderViewStyle(ctrl.getRow())}>
            {!!value && <Image src={value}/>}
            {!!value && <a href={value} target="_blank">Download</a>}
            <input type="file" onChange={ctrl.onFileChange} disabled={!ctrl.isEditable()}/>
        </div>;
    }
}
