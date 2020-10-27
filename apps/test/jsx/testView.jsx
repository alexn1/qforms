class testView extends ApplicationView {
    constructor(props) {
        console.log('testView.constructor');
        super(props);
    }
    rend
    render() {
        const ctrl = this.props.ctrl;
        return (
            <div className="testView">testView</div>
        );
    }
}
