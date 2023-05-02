"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewActionController = void 0;
const ModalController_1 = require("../ModalController");
const NewActionView_1 = require("./NewActionView");
class NewActionController extends ModalController_1.ModalController {
    getViewClass() {
        return NewActionView_1.NewActionView;
    }
}
exports.NewActionController = NewActionController;
