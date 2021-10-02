window.QForms = {};
class ReactComponent extends React.Component {
    constructor(props) {
        super(props);
        if (props.onCreate) props.onCreate(this, this.props.name);
        this.allowRerender = true;
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
    rerender(logTime = true) {
        // console.log(`${this.constructor.name}.rerender`);
        return new Promise(resolve => {
            if (this.canRerender()) {
                const start = Date.now();
                this.forceUpdate(() => {
                    if (logTime) {
                        console.log(`${this.constructor.name}.rerender time:`, Date.now() - start);
                    }
                    resolve();
                });
            } else {
                resolve();
            }
        });
    }
    canRerender() {
        if (!this.allowRerender) return false;
        if (this.props.parent) return this.props.parent.canRerender();
        return true;
    }
    disableRerender() {
        console.log(`${this.constructor.name}.disableRerender`);
        this.allowRerender = false;
    }
    enableRerender() {
        console.log(`${this.constructor.name}.enableRerender`);
        this.allowRerender = true;
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
