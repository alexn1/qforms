class Box extends React.Component {
    constructor(props) {
        console.log('Box.constructor', props);
        super(props);
        this.state = {
            backgroundColor: 'purple'
        };
        this.update = this.update.bind(this);
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
    update() {
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
            <div
                className="Box"
                style={this.state}
                onClick={this.update}
            >
            </div>
        );
    }
}
