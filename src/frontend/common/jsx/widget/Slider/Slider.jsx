class Slider extends ReactComponent {
    constructor(props) {
        super(props);
        if (!this.props.images) throw new Error('Slider: no images');
        this.state = {image: 0};
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
    render() {
        const images = this.props.images || [];
        return <div className={this.getClassName()} >
            <img className={'Slider_image'} src={images[this.state.image]}/>
            <p className={'Slider__label'}>{images.length > 0 ? this.state.image+1 : 0}/{images.length}</p>
            <button className={'Slider__prev'} onClick={this.onPrevClick}>prev</button>
            <button className={'Slider__next'} onClick={this.onNextClick}>next</button>
        </div>;
    }
}
