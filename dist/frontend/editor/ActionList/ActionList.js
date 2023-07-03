"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionList = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const common_1 = require("../../common");
class ActionList extends common_1.ReactComponent {
    constructor(props) {
        super(props);
        this.onClick = async (li) => {
            console.debug('ActionList.onClick', li);
            await this.props.onClick(li.dataset.action);
        };
        this.state = {
            item: null,
        };
    }
    render() {
        // console.debug('ActionList.render', this.state.item);
        return ((0, jsx_runtime_1.jsx)(common_1.DropdownButton, { title: 'Actions', onClick: this.onClick, actions: this.state.item
                ? this.state.item.getActions().map((action) => {
                    return { name: action.action, title: action.caption };
                })
                : [] }));
    }
}
exports.ActionList = ActionList;
