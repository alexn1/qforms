class Tooltip extends React.Component {
    constructor(props) {
        console.log('Tooltip.constructor', props);
        super(props);
    }
    render() {
        return (
            <div className={`TooltipWidget ${this.props.type}`}>
                {this.props.type !== 'alert' &&
                    <div>tooltip</div>
                }
                <span className={this.props.position}>{this.props.tip || 'tip'}</span>
            </div>
        );
    }
}
