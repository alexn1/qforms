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
        const viewValue = await Helper.readFileAsDataURL(file);
        // console.log('viewValue:', viewValue);
        this.props.ctrl.onChange(viewValue);
    }
    render() {
        const ctrl = this.props.ctrl;
        const value = ctrl.getValueForView();
        return <div className={this.getClassName()} style={ctrl.renderViewStyle(ctrl.getRow())}>
            {!!value &&
                <div>
                    <Image ref={this.image} src={value}/>
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
