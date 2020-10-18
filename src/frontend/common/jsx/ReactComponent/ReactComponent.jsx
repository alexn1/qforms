class ReactComponent extends React.Component {
    constructor(props) {
        super(props);
        // if (props.cb) props.cb(this, this.props.name);
        if (props.onCreate) props.onCreate(this, this.props.name);
    }
    rerender() {
        // console.log(`${this.constructor.name}.rerender`);
        const start = new Date().getTime();
        this.forceUpdate(() => console.log(`${this.constructor.name}.rerender time:`, new Date().getTime() - start));
    }
}
