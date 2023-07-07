"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.View = void 0;
const common_1 = require("../../common");
class View extends common_1.ReactComponent {
    constructor(props) {
        super(props);
        if (!props.ctrl)
            throw new Error(`${this.constructor.name}: no ctrl`);
        // if (!props.onCreate) throw new Error(`${this.constructor.name}: no onCreate`);
    }
    getCtrl() {
        return this.props.ctrl;
    }
}
exports.View = View;
