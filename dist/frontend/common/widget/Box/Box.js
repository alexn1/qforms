"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Box = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const ReactComponent_1 = require("../../ReactComponent");
const Button_1 = require("../Button");
require("./Box.less");
class Box extends ReactComponent_1.ReactComponent {
    constructor(props) {
        // console.debug('Box.constructor', props);
        super(props);
        this.update = () => {
            console.debug('Box.update');
            this.setState({
                backgroundColor: 'green',
            });
        };
        this.state = {
            backgroundColor: 'purple',
        };
    }
    // componentWillMount() {
    //     console.debug('Box.componentWillMount');
    // }
    componentDidMount() {
        console.debug('Box.componentDidMount');
    }
    componentWillUnmount() {
        console.debug('Box.componentWillUnmount');
    }
    shouldComponentUpdate(nextProps, nextState) {
        console.debug('Box.shouldComponentUpdate', nextProps, nextState);
        return true;
    }
    componentDidUpdate() {
        console.debug('Box.componentDidUpdate');
    }
    render() {
        console.debug('Box.render');
        return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "Box" }, { children: [(0, jsx_runtime_1.jsx)(Button_1.Button, { name: "one" }), (0, jsx_runtime_1.jsx)(Button_1.Button, { name: "two" }), (0, jsx_runtime_1.jsx)(Button_1.Button, { name: "three" })] })));
    }
}
exports.Box = Box;
if (typeof window === 'object') {
    // @ts-ignore
    window.Box = Box;
}
