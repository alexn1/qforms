class Statusbar extends ReactComponent {
    constructor(props) {
        // console.log('Statusbar.constructor', props);
        super(props);
        this.state = {};
    }
    setLastQueryTime(lastQueryTime) {
        this.setState({lastQueryTime});
    }
    render() {
        return (
            <div className="Statusbar">
                <div>Last query time: {this.state.lastQueryTime ? `${this.state.lastQueryTime} ms` : '-' }</div>
            </div>
        );
    }
}

window.QForms.Statusbar = Statusbar;
