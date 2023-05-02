"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableFormFieldView = void 0;
const react_1 = __importDefault(require("react"));
const FieldView_1 = require("../FieldView");
class TableFormFieldView extends FieldView_1.FieldView {
    constructor(props) {
        super(props);
        this.span = react_1.default.createRef();
    }
    getSpanOffsetWidth() {
        // console.log('TableFormFieldView.getSpanOffsetWidth', this.span.current);
        if (!this.span.current)
            return 0;
        return this.span.current.offsetWidth;
    }
}
exports.TableFormFieldView = TableFormFieldView;
