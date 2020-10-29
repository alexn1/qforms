class testView extends ApplicationView {
    constructor(props) {
        console.log('testView.constructor');
        super(props);
    }
    render() {
        const ctrl = this.props.ctrl;
        return (
            <div>
                <Button onClick={ctrl.onButtonClick}>Button</Button>
                <input type="file" onChange={ctrl.onFileChange}/>
            </div>
        );
    }
}
