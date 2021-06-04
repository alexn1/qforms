class MonitorView extends ReactComponent {
    renderApplication(app) {
        return (
            <li key={app.route}>
                <div>{app.route}</div>
                <ul>
                    {app.pages.map(page => <li key={page.name}>{page.name}</li>)}
                </ul>
            </li>
        );
    }
    render() {
        console.log('MonitorView.render', this.props.data);
        const data = this.props.data;
        return (
            <div className="MonitorView">
                <div>nodeEnv: {data.nodeEnv}</div>
                <div>uptime: {data.uptime}ms</div>
                <div>applications:</div>
                <ul>
                    {data.applications.map(app => this.renderApplication(app))}
                </ul>
            </div>
        );
    }
}
