class Slider extends ReactComponent {
    render() {
        const images = this.props.images || [];
        return <div className={this.getClassName()} style={{width: this.props.width, height: this.props.height}}>
            <div className={'Slider__list'}>
                {images.map(src => <img src={src}/>)}
            </div>
            <p className={'Slider__label'}>1/8</p>
        </div>;
    }
}
