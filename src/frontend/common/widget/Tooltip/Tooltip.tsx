import { ReactComponent } from '../../ReactComponent';
import './Tooltip.less';

export class Tooltip extends ReactComponent {
    // constructor(props) {
    //     console.log('Tooltip.constructor', props);
    //     super(props);
    // }

    render() {
        // console.log('Tooltip.render', this.state, this.props);
        return (
            <div className={`Tooltip ${this.props.type} ${this.props.hidden ? 'hidden' : ''}`}>
                {this.props.type !== 'alert' && <div>tooltip</div>}
                <span className={this.props.position}>{this.props.tip || 'tip'}</span>
            </div>
        );
    }
}

if (typeof window === 'object') {
    // @ts-ignore
    window.Tooltip = Tooltip;
}
