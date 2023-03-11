"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyGrid = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const common_1 = require("../../common");
require("./PropertyGrid.less");
class PropertyGrid extends common_1.ReactComponent {
    constructor(props) {
        super(props);
        this.onChange = (name, value) => {
            // console.log('PropertyGrid.onChange', name, value);
            if (this.props.onChange) {
                this.props.onChange(name, value);
            }
        };
        this.state = {};
    }
    getObj() {
        if (this.state.object) {
            return this.state.object.obj;
        }
        return null;
    }
    getOptions() {
        if (this.state.object) {
            return this.state.object.options;
        }
        return null;
    }
    renderInput(name) {
        const obj = this.getObj();
        return ((0, jsx_runtime_1.jsx)(common_1.TextBox, { name: name, value: obj[name], spellCheck: 'false', onBlur: (event) => {
                if (obj[name] !== event.currentTarget.value) {
                    this.onChange(name, event.currentTarget.value);
                }
            }, autocomplete: 'off' }));
    }
    renderSelect(name) {
        const obj = this.getObj();
        const options = this.getOptions();
        return ((0, jsx_runtime_1.jsx)(common_1.ComboBox, { name: name, value: obj[name], items: options[name].map((value) => ({
                value: value,
                title: value,
            })), onChange: (value) => this.onChange(name, value) }));
    }
    renderRows() {
        const obj = this.getObj();
        const options = this.getOptions();
        return Object.keys(obj).map((name) => ((0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("td", { children: name }), (0, jsx_runtime_1.jsx)("td", { children: options[name] !== undefined ? this.renderSelect(name) : this.renderInput(name) })] }, name)));
    }
    render() {
        return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'PropertyGrid full frame' }, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'frame__container' }, { children: (0, jsx_runtime_1.jsx)("table", Object.assign({ className: 'PropertyGrid__table', cellPadding: 0, cellSpacing: 0 }, { children: (0, jsx_runtime_1.jsx)("tbody", { children: this.getObj() && this.renderRows() }) })) })) })));
    }
}
exports.PropertyGrid = PropertyGrid;
