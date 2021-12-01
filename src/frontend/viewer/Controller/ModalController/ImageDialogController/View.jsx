class ImageDialogView extends View {
    constructor(props) {
        super(props);
        this.el = React.createRef();
    }
    render() {
        console.log('ImageDialogView.render');
        const ctrl = this.props.ctrl;
        return <div className={this.getCssClassNames()}
                    ref={this.el}
                    tabIndex={0}
                    onKeyDown={this.getCtrl().onKeyDown}
        >
            <img className={`${this.getCssBlockName()}__image`} src={ctrl.getSrc()}/>
            <button className={`${this.getCssBlockName()}__close`} onClick={ctrl.onCloseClick}>
                <CloseIcon/>
            </button>
        </div>;
    }
    componentDidMount() {
        this.getElement().focus();
    }
}
