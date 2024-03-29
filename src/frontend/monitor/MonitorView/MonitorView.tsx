import { FormatHelper } from '../../common/FormatHelper';
import { Helper } from '../../common/Helper';
import { ReactComponent } from '../../common/ReactComponent';

import './MonitorView.less';

export class MonitorView extends ReactComponent {
    renderApplication(app) {
        return (
            <li key={app.route}>
                <div>
                    {app.route} <span style={{ color: 'gray' }}>version: {app.version}</span>
                </div>
                <ul>
                    <li>
                        <div>pages:</div>
                        <ul>
                            {app.pages.map((page) => (
                                <li key={page.name}>{page.name}</li>
                            ))}
                        </ul>
                    </li>
                    <li>
                        <div>clients:</div>
                        <ul>
                            {app.clients.map((client) => (
                                <li key={client.uuid}>
                                    {client.uuid}
                                    &nbsp;
                                    <span style={{ color: 'blue' }}>{client.ip}</span>
                                    &nbsp; v{client.version}
                                    &nbsp;
                                    <span
                                        style={{
                                            color: 'green',
                                        }}>{`userId: ${client.userId}`}</span>
                                </li>
                            ))}
                        </ul>
                    </li>
                </ul>
            </li>
        );
    }

    render() {
        console.debug('MonitorView.render', this.props.data);
        const data = this.props.data;
        return (
            <div className="MonitorView">
                <div>nodeEnv: {data.nodeEnv}</div>
                <div>uptime: {FormatHelper.formatNumber(data.uptime)} ms</div>
                <div>applications:</div>
                <ul>{data.applications.map((app) => this.renderApplication(app))}</ul>
            </div>
        );
    }
}
