class Statusbar extends React.Component {
    constructor(props) {
        console.log('Statusbar.constructor', props);
        super(props);
        if (props.cb) props.cb(this, this.props.name);
        this.state = {};
    }
    setLastQueryTime(lastQueryTime) {
        this.setState({lastQueryTime});
    }
    render() {
        return (<div >Last query time: {this.state.lastQueryTime ? `${this.state.lastQueryTime} ms` : '-' }</div>);
    }
}
