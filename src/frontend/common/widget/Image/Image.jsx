class Image extends ReactComponent {
    constructor(props) {
        super(props);
        this.img = React.createRef();
        this.state = {classList: null};
    }
    getNaturalSize() {
        return [this.img.current.naturalWidth, this.img.current.naturalHeight];
    }
    onImgClick = e => {
        console.log('Image.onImgClick');
        this.setState(prevState => {
            if (prevState.classList) {
                return {classList: null};
            } else {
                return {classList: ['Image_full']};
            }
        });
    }
    render() {
        return (
            <img
                className={this.getCssClassNames()}
                ref={this.img}
                src={this.props.src}
                onClick={this.onImgClick}
            />
        );
    }
    /*componentDidMount() {
        console.log('Image.componentDidMount', this.getNaturalSize());
    }*/
}

window.QForms.Image = Image;
