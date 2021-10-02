window.QForms = {};
class ReactComponent extends React.Component {
    constructor(props) {
        super(props);
        if (props.onCreate) props.onCreate(this, this.props.name);
    }
    checkParent() {
        if (!this.props.parent) throw new Error(`${this.constructor.name}: no parent`);
    }
    getClassList() {
        return [
            this.getCssBlockName(),
            ...(this.props.classList || []),
            ...(this.state && this.state.classList ? this.state.classList : [])
        ];
    }
    getCssBlockName() {
        return this.constructor.name;
    }
    getCssClassNames() {
        return this.getClassList().join(' ');
    }
    /*getClassName() {
        return this.getClassList().join(' ');
    }*/
    rerender(logTime = true) {
        // console.log(`${this.constructor.name}.rerender`);
        return new Promise(resolve => {
            const start = Date.now();
            this.forceUpdate(() => {
                if (logTime) {
                    console.log(`${this.constructor.name}.rerender time:`, Date.now() - start);
                }
                resolve();
            });
        });
    }
    componentWillUnmount() {
        // console.log('ReactComponent.componentWillUnmount');
        if (this.props.onUnmount) this.props.onUnmount(this, this.props.name);
    }
    /*componentDidMount() {
        console.log('ReactComponent.componentDidMount', this.constructor.name);
    }*/
}

window.QForms.ReactComponent = ReactComponent;
