class testView extends ApplicationView {
    constructor(props) {
        console.log('testView.constructor');
        super(props);
    }
    render() {
        const ctrl = this.props.ctrl;
        return (
            <div>
                <Button onClick={ctrl.onButtonClick}>abc</Button>
                <input type="file"/>
            </div>
        );
    }
}
