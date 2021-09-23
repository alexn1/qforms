window.QForms = {};
class ReactComponent extends React.Component {
    constructor(props) {
        super(props);
        // if (props.cb) props.cb(this, this.props.name);
        if (props.onCreate) props.onCreate(this, this.props.name);
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
