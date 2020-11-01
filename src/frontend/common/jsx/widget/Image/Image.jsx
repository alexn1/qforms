class Image extends ReactComponent {
    constructor(props) {
        super(props);
        this.img = React.createRef();
    }
    getNaturalSize() {
        return [this.img.current.naturalWidth, this.img.current.naturalHeight];
    }
    render() {
        return (
            <img ref={this.img} src={this.props.src}/>
        );
    }
    /*componentDidMount() {
        console.log('Image.componentDidMount', this.getNaturalSize());
    }*/
}
