class Tooltip extends React.Component {
    constructor(props) {
        console.log('Tooltip.constructor', props);
        super(props);
        this.state = {
            tip   : props.tip,
            hidden: props.hidden
        };
        if (props.cb) props.cb(this);
    }
    setTipText(tip) {
        this.setState({tip});
    }
    show() {
        this.setState({hidden: false});
    }
    hide() {
        this.setState({hidden: true});
    }
    render() {
        return (
            <div className={`TooltipWidget ${this.props.type} ${this.state.hidden ? 'hidden' : ''}`}>
                {this.props.type !== 'alert' &&
                    <div>tooltip</div>
                }
                <span className={this.props.position}>{this.state.tip || 'tip'}</span>
            </div>
        );
    }
}
