class ReactComponent extends React.Component {
    constructor(props) {
        super(props);
        if (props.cb) props.cb(this, this.props.name);
    }
    rerender() {
        console.log(`${this.constructor.name}.rerender`);
        return new Promise(resolve => this.forceUpdate(resolve));
    }
}
