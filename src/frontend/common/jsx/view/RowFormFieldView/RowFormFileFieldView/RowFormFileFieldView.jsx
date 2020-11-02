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
        const ns = this.getImage().getNaturalSize();
        this.getDiv().innerText = `${ns[0]}×${ns[1]}`;
    }
    render() {
        const ctrl = this.props.ctrl;
        const value = ctrl.getValueForView();
        return <div className={this.getClassName()} style={ctrl.renderViewStyle(ctrl.getRow())}>
            {!!value &&
                <div>
                    <a href={value} target="_blank">
                        <Image ref={this.image} src={value}/>
                    </a>
                    <span className="size" ref={this.div}></span>
                    <span className="length">{value.length}</span>
                </div>
            }
            {!!value && <a href={value} target="_blank">Download</a>}
            <input type="file" onChange={ctrl.onFileChange} disabled={!ctrl.isEditable()}/>
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
