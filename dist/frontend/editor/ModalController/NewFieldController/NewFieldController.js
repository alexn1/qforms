"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewFieldController = void 0;
const ModalController_1 = require("../ModalController");
const NewFieldView_1 = require("./NewFieldView");
class NewFieldController extends ModalController_1.ModalController {
    getViewClass() {
        return NewFieldView_1.NewFieldView;
    }
}
exports.NewFieldController = NewFieldController;
