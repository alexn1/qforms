class Slider extends ReactComponent {
    constructor(props) {
        super(props);
        if (!this.props.images) throw new Error('Slider: no images');
        this.state = {image: 0, classList: null};
    }
    onPrevClick = e => {
        // console.log('Slider.onPrevClick');
        this.setState(prevState => {
            let image = prevState.image - 1;
            if (image < 0) {
                image = this.props.images.length - 1;
            }
            return {image};
        });
    }
    onNextClick = e => {
        // console.log('Slider.onNextClick');
        this.setState(prevState => {
            let image = prevState.image + 1;
            if (image > this.props.images.length-1) {
                image = 0;
            }
            return {image};
        });
    }
    onImageClick = e => {
        console.log('Slider.onImageClick');
        if (this.state.classList) {
            this.setState({classList: null});
        } else {
            this.setState({classList: ['full']});
        }
    }
    onCloseClick = e => {
        this.setState({classList: null});
    }
    render() {
        // console.log('Slider.render', this.props.images);
        const images = this.props.images || [];
        return <div className={this.getCssClassNames()}>
            <img className={'Slider_image'} src={images[this.state.image]} onClick={this.onImageClick}/>
            {images.length > 1 &&
                <div className={'Slider__label'}>{images.length > 0 ? this.state.image+1 : 0}/{images.length}</div>
            }
            {images.length > 1 &&
                <div className={'Slider__arrow left'} onClick={this.onPrevClick}>
                    <LeftIcon/>
                </div>
            }
            {images.length > 1 &&
                <div className={'Slider__arrow right'} onClick={this.onNextClick}>
                    <RightIcon/>
                </div>
            }
            <div className={'Slider__close'} onClick={this.onCloseClick}>
                <CloseIcon2/>
            </div>
        </div>;
    }
}

window.QForms.Slider = Slider;
