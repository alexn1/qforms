"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewFieldController = void 0;
const EdModalController_1 = require("../EdModalController");
const NewFieldView_1 = require("./NewFieldView");
class NewFieldController extends EdModalController_1.EdModalController {
    getViewClass() {
        return NewFieldView_1.NewFieldView;
    }
}
exports.NewFieldController = NewFieldController;
