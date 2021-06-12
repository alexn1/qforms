class Box extends ReactComponent {
    constructor(props) {
        console.log('Box.constructor', props);
        super(props);
        this.state = {
            backgroundColor: 'purple'
        };
    }
    // componentWillMount() {
    //     console.log('Box.componentWillMount');
    // }
    componentDidMount() {
        console.log('Box.componentDidMount');
    }
    componentWillUnmount() {
        console.log('Box.componentWillUnmount');
    }
    update = () => {
        console.log('Box.update');
        this.setState({
            backgroundColor: 'green'
        });
    }
    shouldComponentUpdate(nextProps, nextState) {
        console.log('Box.shouldComponentUpdate', nextProps, nextState);
        return true;
    }
    componentDidUpdate() {
        console.log('Box.componentDidUpdate');
    }
    render() {
        console.log('Box.render');
        return (
            <div className="Box">
                <Button name="one"/>
                <Button name="two"/>
                <Button name="three"/>
            </div>
        );
    }
}

window.QForms.Box = Box;
