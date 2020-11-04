class ReactComponent extends React.Component {
    constructor(props) {
        super(props);
        // if (props.cb) props.cb(this, this.props.name);
        if (props.onCreate) props.onCreate(this, this.props.name);
    }
    getClassList() {
        return [
            this.constructor.name,
            ...(this.props.classList || [])
        ];
    }
    getClassName() {
        return this.getClassList().join(' ');
    }
    rerender() {
        // console.log(`${this.constructor.name}.rerender`);
        const start = Date.now();
        this.forceUpdate(() => console.log(`${this.constructor.name}.rerender time:`, Date.now() - start));
    }
    componentWillUnmount() {
        // console.log('ReactComponent.componentWillUnmount');
        if (this.props.onUnmount) this.props.onUnmount(this, this.props.name);
    }
}
