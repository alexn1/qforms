import { ReactComponent } from '../../ReactComponent';
import { DownIcon } from '../../icon/DownIcon';
import './Expand.less';

export class Expand extends ReactComponent {
    constructor(props) {
        super(props);
        this.state = {
            opened: this.props.opened !== undefined ? this.props.opened : false,
        };
    }
    isOpened() {
        return this.state.opened;
    }
    isHighlighted() {
        return !!this.props.highlighted;
    }
    onTitleClick = (e) => {
        console.log('Expand.onTitleClick');
        this.setState((prevState) => {
            return { opened: !prevState.opened };
        });
    };
    render() {
        return (
            <div
                className={`${this.getCssClassNames()} ${this.isOpened() ? 'opened' : ''} ${
                    this.isHighlighted() ? 'highlighted' : ''
                }`}>
                <div className={`${this.getCssBlockName()}__header`} onClick={this.onTitleClick}>
                    <div className={`${this.getCssBlockName()}__icon`}>
                        <DownIcon />
                    </div>
                    <div className={`${this.getCssBlockName()}__title`}>{this.props.title}</div>
                </div>
                <div className={`${this.getCssBlockName()}__content`}>{this.props.children}</div>
            </div>
        );
    }
}

// @ts-ignore
window.Expand = Expand;
