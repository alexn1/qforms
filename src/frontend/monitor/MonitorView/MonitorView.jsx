class MonitorView extends ReactComponent {
    renderApplication(app) {
        return (
            <li key={app.route}>
                <div>{app.route} <span style={{color: 'gray'}}>version: {app.version}</span></div>
                <ul>
                    <li>
                        <div>pages:</div>
                        <ul>
                            {app.pages.map(page => <li key={page.name}>{page.name}</li>)}
                        </ul>
                    </li>
                    <li>
                        <div>clients:</div>
                        <ul>
                            {app.clients.map(client => <li key={client.uuid}>{client.uuid}</li>)}
                        </ul>
                    </li>
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
                <div>uptime: {Helper.formatNumber(data.uptime)} ms</div>
                <div>applications:</div>
                <ul>
                    {data.applications.map(app => this.renderApplication(app))}
                </ul>
            </div>
        );
    }
}
