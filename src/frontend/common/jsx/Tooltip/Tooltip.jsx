class Tooltip extends React.Component {
    constructor(props) {
        console.log('Tooltip.constructor', props);
        super(props);
        if (props.cb) props.cb(this, this.props.name);
        this.state = {
            tip   : props.tip,
            hidden: props.hidden
        };
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
