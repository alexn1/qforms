class RowFormFileFieldView extends RowFormFieldView {
    constructor(props) {
        super(props);
        this.image = React.createRef();
        this.div   = React.createRef();
    }
    getImage() {
        return this.image.current;
    }
    getDiv() {
        return this.div.current;
    }
    updateSize() {
        if (this.getImage()) {
            const ns = this.getImage().getNaturalSize();
            this.getDiv().innerText = `${ns[0]}×${ns[1]}`;
        }
    }
    onClearClick = e => {
        this.props.ctrl.onChange('');
    }
    onChange = async e => {
        const file = e.target.files[0];
        const widgetValue = await Helper.readFileAsDataURL(file);
        // console.log('widgetValue:', widgetValue);
        this.props.ctrl.onChange(widgetValue);
    }
    onImageClick = async e => {
        console.log('RowFormFileFieldView.onImageClick');
        const ctrl = this.props.ctrl;
        const app = ctrl.getApp();
        const src = ctrl.getValueForWidget();
        const imageDialogCtrl = new ImageDialogController({
            app,
            id: app.getNewId(),
            src,
            onCloseHook: () => {console.log('onCloseHook')}
        });
        await app.openModal(imageDialogCtrl);
    }
    render() {
        const ctrl = this.props.ctrl;
        const row = ctrl.getRow();
        const value = ctrl.getValueForWidget();
        return <div className={this.getCssClassNames()} style={this.getStyle(row)}>
            {!!value &&
                <div>
                    <Image ref={this.image} src={value} onClick={this.onImageClick}/>
                    <span className="size" ref={this.div}></span>
                    <span className="length">{value.length}</span>
                </div>
            }
            <input type="file" onChange={this.onChange} disabled={!ctrl.isEditable()}/>
            {!!value && <Button onClick={this.onClearClick} enabled={ctrl.isEditable()}>Clear</Button>}
        </div>;
    }
    componentDidMount() {
        // console.log('RowFormFileFieldView.componentDidMount', this.props.ctrl.model.getFullName());
        setTimeout(() => this.updateSize(), 0);
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        // console.log('RowFormFileFieldView.componentDidUpdate', this.props.ctrl.model.getFullName(), snapshot);
        setTimeout(() => this.updateSize(), 0);
    }
}
window.QForms.RowFormFileFieldView = RowFormFileFieldView;
