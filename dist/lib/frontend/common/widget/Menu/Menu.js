"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Menu = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const ReactComponent_1 = require("../../ReactComponent");
require("./Menu.less");
class Menu extends ReactComponent_1.ReactComponent {
    constructor(props) {
        // console.log('Menu.constructor', props);
        super(props);
        this.onMenuClick = async (e) => {
            // console.log('Menu.onMenuClick', e.currentTarget.dataset.menu);
            await this.toggleMenu(e.currentTarget.dataset.menu);
        };
        this.onBlur = async (e) => {
            // console.log('Menu.onBlur', e.currentTarget.dataset.menu);
            await this.closeMenu(e.currentTarget.dataset.menu);
        };
        this.onMouseDown = (e) => {
            // console.log('Menu.onMouseDown');
            e.preventDefault();
            // e.stopPropagation();
            // return false;
        };
        this.onMenuItemClick = async (e) => {
            // console.log('Menu.onMenuItemClick', e.target.dataset.menu, e.target.dataset.item);
            e.persist();
            const { menu, type, name } = e.target.dataset;
            await this.closeMenu(menu);
            if (this.props.onClick) {
                this.props.onClick(menu, type, name);
            }
        };
        this.state = {};
    }
    toggleMenu(menu) {
        return new Promise((resolve) => {
            this.setState((prevState) => ({
                [menu]: !prevState[menu],
            }), resolve);
        });
    }
    closeMenu(menu) {
        return new Promise((resolve) => this.setState({ [menu]: false }, resolve));
    }
    render() {
        return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: "Menu" }, { children: this.props.items &&
                this.props.items.map((menu) => ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: this.state[menu.name] ? 'active' : null }, { children: [(0, jsx_runtime_1.jsx)("button", Object.assign({ "data-menu": menu.name, onClick: this.onMenuClick, onBlur: this.onBlur }, { children: menu.title })), (0, jsx_runtime_1.jsx)("div", Object.assign({ onMouseDown: this.onMouseDown, onClick: this.onMenuItemClick }, { children: menu.items.map((item) => ((0, jsx_runtime_1.jsx)("a", Object.assign({ "data-menu": menu.name, "data-type": item.type, "data-name": item.name }, { children: item.title }), item.name))) }))] }), menu.name))) })));
    }
}
exports.Menu = Menu;
// @ts-ignore
window.Menu = Menu;
