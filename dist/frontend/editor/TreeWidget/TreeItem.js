"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreeItem = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const common_1 = require("../../common");
class TreeItem extends common_1.ReactComponent {
    constructor(props) {
        super(props);
        this.onDivMouseDown = (e) => {
            // console.debug('TreeItem.onDivMouseDown', e.currentTarget);
            const item = this.props.item;
            const tree = this.props.tree;
            tree.select(item);
        };
        this.onDivDoubleClick = (e) => {
            // console.debug('TreeItem.onDivDoubleClick');
            const item = this.props.item;
            const tree = this.props.tree;
            tree.onDoubleClick(item);
        };
        this.onNodeMouseDown = (e) => {
            // console.debug('TreeItem.onNodeMouseDown', e.currentTarget);
            const item = this.props.item;
            const tree = this.props.tree;
            const opened = this.state.opened;
            e.stopPropagation();
            this.setState((prevState) => {
                return { opened: !prevState.opened };
            });
            if (!opened) {
                tree.onOpen(item);
            }
        };
        this.state = {
            opened: props.item.opened !== undefined ? props.item.opened : false,
        };
        this.li = React.createRef();
    }
    isSelected() {
        return this.props.tree.getSelectedItem() === this.props.item;
    }
    isOpened() {
        return this.state.opened;
    }
    getElement() {
        return this.li.current;
    }
    open() {
        console.debug('TreeItem.open', this.props.item.getTitle());
        // @ts-ignore
        this.state.opened = true;
        if (this.parent) {
            this.parent.open();
        }
        else {
            console.debug('this.parent', this.parent);
        }
    }
    render() {
        // console.debug('TreeItem.render', this.props.item.getTitle());
        const tree = this.props.tree;
        const item = this.props.item;
        const items = item.items;
        const hasItems = !!(items && items.length);
        const isNode = item.node || hasItems;
        const style = item.getStyle ? item.getStyle() : null;
        const title = item.getTitle();
        return ((0, jsx_runtime_1.jsxs)("li", Object.assign({ ref: this.li, className: this.isOpened() ? 'opened' : undefined }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: this.isSelected() ? 'active' : undefined, style: { paddingLeft: this.props.paddingLeft }, onMouseDown: this.onDivMouseDown, onDoubleClick: this.onDivDoubleClick }, { children: [(0, jsx_runtime_1.jsx)("span", { className: isNode ? 'node' : 'leaf', onMouseDown: this.onNodeMouseDown }), "\u00A0", (0, jsx_runtime_1.jsx)("span", Object.assign({ style: style }, { children: title }))] })), hasItems && ((0, jsx_runtime_1.jsx)("ul", { children: items.map((item) => ((0, jsx_runtime_1.jsx)(TreeItem, { tree: tree, item: item, paddingLeft: this.props.paddingLeft + 15, onCreate: (c) => {
                            // console.debug('onCreate', this.props.item.getTitle(), item.getTitle());
                            c.parent = this;
                            item.view = c;
                        } }, item.getTitle()))) }))] }), title));
    }
}
exports.TreeItem = TreeItem;
