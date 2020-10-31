class RowFormFileFieldView extends RowFormFieldView {
    render() {
        const ctrl = this.props.ctrl;
        const value = ctrl.getValueForView();
        return <div className={this.getClassName()} style={ctrl.renderViewStyle(ctrl.getRow())}>
            {!!value &&
                <a href={value} target="_blank">
                    <Image src={value}/>
                </a>
            }
            {/*{!!value && <a href={value} target="_blank">Download</a>}*/}
            <input type="file" onChange={ctrl.onFileChange} disabled={!ctrl.isEditable()}/>
        </div>;
    }
}
