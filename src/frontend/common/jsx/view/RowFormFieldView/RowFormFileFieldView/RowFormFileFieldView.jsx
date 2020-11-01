class RowFormFileFieldView extends RowFormFieldView {
    constructor(props) {
        super(props);
        this.image = React.createRef();
        this.state = {
            size: null
        };
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
                    <div>{this.state.size ? JSON.stringify(this.state.size) : null}</div>
                </div>
            }
            {/*{!!value && <a href={value} target="_blank">Download</a>}*/}
            <input type="file" onChange={ctrl.onFileChange} disabled={!ctrl.isEditable()}/>
        </div>;
    }
    componentDidMount() {
        setTimeout(()=> {
            console.log('this.image.current.getNaturalSize()', this.image.current.getNaturalSize());
            this.setState({size: this.image.current.getNaturalSize()});
        }, 0);

    }
}
