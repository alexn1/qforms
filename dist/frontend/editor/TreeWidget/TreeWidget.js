"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreeWidget = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const common_1 = require("../../common");
const TreeItem_1 = require("./TreeItem");
require("./TreeWidget.less");
class TreeWidget extends common_1.ReactComponent {
    constructor(props) {
        super(props);
        this.state = {
            selectedItem: null,
        };
    }
    async select(item) {
        console.debug('TreeWidget.select', item ? item.getTitle() : null);
        if (this.isSelected(item))
            return;
        return new Promise((resolve) => {
            this.setState({ selectedItem: item }, () => {
                if (this.props.onItemSelect)
                    this.props.onItemSelect(item);
                resolve();
            });
        });
    }
    onDoubleClick(item) {
        // console.debug('TreeWidget.onDoubleClick', item);
        if (this.props.onItemDoubleClick)
            this.props.onItemDoubleClick(item);
    }
    onOpen(item) {
        if (this.props.onItemOpen)
            this.props.onItemOpen(item);
    }
    isSelected(item) {
        return this.state.selectedItem === item;
    }
    getSelectedItem() {
        return this.state.selectedItem;
    }
    scrollToSelected() {
        console.debug('TreeWidget.scrollToSelected', this.getSelectedItem().getTitle());
        this.getSelectedItem().view.getElement().scrollIntoView();
    }
    render() {
        console.debug('TreeWidget.render' /*, this.props.items*/);
        const items = this.props.items;
        return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: this.getCssClassNames() }, { children: (0, jsx_runtime_1.jsx)("ul", { children: items.map((item) => ((0, jsx_runtime_1.jsx)(TreeItem_1.TreeItem, { tree: this, item: item, paddingLeft: 5, onCreate: (c) => (item.view = c) }, item.getTitle()))) }) })));
    }
}
exports.TreeWidget = TreeWidget;
