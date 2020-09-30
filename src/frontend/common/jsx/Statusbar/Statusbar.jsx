class Statusbar extends React.Component {
    constructor(props) {
        console.log('Statusbar.constructor', props);
        super(props);
        this.state = {};
        if (props.cb) props.cb(this);
    }
    setLastQueryTime(lastQueryTime) {
        this.setState({lastQueryTime});
    }
    render() {
        return (<div >Last query time: {this.state.lastQueryTime ? `${this.state.lastQueryTime} ms` : '-' }</div>);
    }
}
