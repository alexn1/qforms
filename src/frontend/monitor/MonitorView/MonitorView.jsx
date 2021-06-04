class MonitorView extends ReactComponent {
    renderApplication(app) {
        return (
            <div key={app.route}>{app.route} ({app.pages.map(page => page.name).join(',')})</div>
        );
    }
    render() {
        console.log('MonitorView.render', this.props.data);
        const data = this.props.data;
        return (
            <div className="MonitorView">
                <div>uptime: {data.uptime}ms</div>
                <div>Applications:</div>
                {data.applications.map(app => this.renderApplication(app))}
            </div>
        );
    }
}
