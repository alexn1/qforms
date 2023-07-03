import { ReactComponent } from '../../ReactComponent';
import './Statusbar.less';

export class Statusbar extends ReactComponent {
    constructor(props) {
        // console.debug('Statusbar.constructor', props);
        super(props);
        this.state = {};
    }

    setLastQueryTime(lastQueryTime) {
        this.setState({ lastQueryTime });
    }

    render() {
        return (
            <div className="Statusbar">
                <div>
                    Last query time:{' '}
                    {this.state.lastQueryTime ? `${this.state.lastQueryTime} ms` : '-'}
                </div>
            </div>
        );
    }
}

if (typeof window === 'object') {
    // @ts-ignore
    window.Statusbar = Statusbar;
}
